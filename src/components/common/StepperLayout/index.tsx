import React, { useEffect } from "react";
import { Stepper, Divider } from "@mantine/core";
import { useNavigate, useLocation } from "react-router";
import styles from "~/styles/stepper.module.css";
import { useLocalStorage } from "@mantine/hooks";

/**
 * Represents a single step in the stepper.
 * @property slug - URL segment for this step (used in routing)
 * @property label - Human‑readable label displayed on the step
 */
export interface Step {
  slug: string;
  label: string;
}

/**
 * Props for the StepperLayout component.
 *
 * @property steps - Ordered array of steps (slug + label)
 * @property basePath - Base path prefix where steps live (e.g. "/app/create-material")
 * @property storageKey - localStorage key under which to save the last visited step index
 * @property children - The content to render below the stepper (usually routed pages)
 */
interface StepperLayoutProps {
  steps: Step[];
  basePath: string;
  storageKey: string;
  children: React.ReactNode;
}

/**
 * A reusable layout component rendering a Mantine Stepper tied to URL routing and localStorage.
 *
 * - Reads the current URL slug and finds its index in `steps`.
 * - Falls back to the saved index in localStorage (under `storageKey`), or 0 if none.
 * - On mount, if URL had no valid slug, redirects to the saved or first step.
 * - Clicking a step:
 *   1. Saves the clicked index into localStorage.
 *   2. Navigates to `${basePath}/${steps[index].slug}`.
 *
 * @param steps - The sequence of steps to display
 * @param basePath - The prefix route for all steps
 * @param storageKey - Key for persisting last step index
 * @param children - Rendered underneath the stepper (typically <Outlet />)
 */
export default function StepperLayout({
  steps,
  basePath,
  storageKey,
  children,
}: StepperLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const [savedIndex, setSavedIndex] = useLocalStorage<number>({
    key: storageKey,
    defaultValue: 0,
  });

  // Ensure savedIndex stays within [0, steps.length)
  const defaultIndex =
    savedIndex >= 0 && savedIndex < steps.length ? savedIndex : 0;

  // Extract slug from URL after basePath
  const rawSlug = location.pathname.replace(new RegExp(`^${basePath}/?`), "");
  const urlIndex = steps.findIndex((s) => s.slug === rawSlug);

  // Decide which step is active:
  // prefer URL if valid, otherwise use saved index
  const activeIndex = urlIndex >= 0 ? urlIndex : defaultIndex;

  // On mount, if URL had no valid slug, redirect to saved/first step
  useEffect(() => {
    if (urlIndex < 0) {
      navigate(`${basePath}/${steps[activeIndex].slug}`, { replace: true });
    }
  }, [urlIndex, activeIndex, basePath, navigate, steps]);

  /**
   * Handler for when a step is clicked.
   * Saves the new index and navigates to the corresponding slug.
   *
   * @param index - Index of the clicked step
   */
  const handleStepClick = (index: number) => {
    setSavedIndex(index);
    navigate(`${basePath}/${steps[index].slug}`);
  };

  return (
    <>
      <Stepper
        py="md"
        px="xl"
        size="sm"
        bg="var(--mantine-color-body)"
        active={activeIndex}
        onStepClick={handleStepClick}
        classNames={{
          root: styles.stepper,
          stepBody: styles.stepBody,
          stepIcon: styles.stepIcon,
          separator: styles.separator,
        }}
      >
        {steps.map((step) => (
          <Stepper.Step key={step.slug} label={step.label} />
        ))}
      </Stepper>
      <Divider />
      {children}
    </>
  );
}
