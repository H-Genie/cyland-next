import styled from "@emotion/styled";
import { usePortfolio } from "hooks/queries/usePortfolio";

export default function PortfolioSelect() {
  const { data, isLoading } = usePortfolio();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const url = e.target.value;

    if (url === "") return;
    window.open(url);
  };

  if (isLoading) return null;
  return (
    <Select onChange={onChange}>
      <option value="">포트폴리오 파도타기</option>
      {data.map(
        (item: any) =>
          item.name !== "Cyland" && (
            <option key={item.name} value={item.link}>
              {item.name}
            </option>
          )
      )}
    </Select>
  );
}

const Select = styled.select`
  width: 100%;
  height: 30px;
  border: 1px solid #85c8f2;
  border-radius: 5px;
  color: rgb(108, 108, 108);
  font-family: S-CoreDream-4Regular;
  font-size: 14px;
  letter-spacing: -0.5px;
  letter-spacing: 0;
  line-height: 18px;

  cursor: pointer;
  padding: 0 6px;
  outline: none;
  background: none;
  appearance: none;
  margin-top: 10px;
`;
