import { useParams } from "react-router";

export default function RopRoqMaterialDetails() {
  const { materialNumber } = useParams();
  return <div>RopRoqMaterialDetails {materialNumber}</div>;
}
