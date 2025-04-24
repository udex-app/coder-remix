import { colorsTuple, createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
  colors: {
    lightGray: colorsTuple("light-dark(#F9FBFD, #29282B)"),
  },
  defaultRadius: "md",
  components: {
    Button: {
      defaultProps: {
        color: "#007294",
      },
    },
    Card: {
      defaultProps: {
        h: "100%",
        radius: "md",
      },
    },
    CardSection: {
      defaultProps: {
        bg: "var(--mantine-color-body)",
      },
    },
    LineChart: {
      defaultProps: {
        h: "300px",
        p: "md",
      },
    },
    BarChart: {
      defaultProps: {
        h: "300px",
        p: "md",
      },
    },
    DonutChart: {
      defaultProps: {
        h: "300px",
        w: "100%",
        p: "md",
      },
    },
    AppShell: {
      defaultProps: {
        p: "0",
        header: {
          height: 60,
        },
        layout: "alt",
        navbar: {
          breakpoint: "sm",
        },
      },
    },
    TextInput: {
      defaultProps: {
        labelProps: {
          mb: "xs",
        },
      },
    },
    Select: {
      defaultProps: {
        labelProps: {
          mb: "xs",
        },
      },
    },
    Textarea: {
      defaultProps: {
        labelProps: {
          mb: "xs",
        },
      },
    },
    NumberInput: {
      defaultProps: {
        labelProps: {
          mb: "xs",
        },
      },
    },
    Checkbox: {
      defaultProps: {
        labelProps: {
          mb: "xs",
        },
      },
    },
    Radio: {
      defaultProps: {
        labelProps: {
          mb: "xs",
        },
      },
    },
    MultiSelect: {
      defaultProps: {
        labelProps: {
          mb: "xs",
        },
      },
    },
  },
});
