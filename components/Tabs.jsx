import styled from "styled-components";

const StyledTabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;
const StyledTab = styled.span`
  cursor: pointer;
  font-size: 1.5rem;
  ${(props) =>
    props.active
      ? `
        color: black;
        border-bottom: 2px solid black;
    `
      : `
        color: #999;
    `}
`;

export default function Tabs({ tabs, active, onChange }) {
  return (
    <StyledTabs className="">
      {tabs.map((tabName, index) => (
        <StyledTab
          key={index}
          active={tabName === active}
          onClick={() => {
            onChange(tabName);
          }}
        >
          {tabName}
        </StyledTab>
      ))}
    </StyledTabs>
  );
}
