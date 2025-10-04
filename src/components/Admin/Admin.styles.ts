import styled from "@emotion/styled";

export const AdminContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const AdminHeader = styled.div`
  text-align: center;

  h2 {
    font-family: S-CoreDream-7ExtraBold;
    font-size: 32px;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-family: S-CoreDream-4Regular;
    font-size: 16px;
    color: #666;
  }
`;

export const AdminTabs = styled.div`
  display: flex;
  gap: 10px;
  border-bottom: 2px solid #e0e0e0;
`;

export const TabButton = styled.button<{ active: boolean }>`
  padding: 15px 30px;
  border: none;
  background: ${props => (props.active ? "#85c8f2" : "transparent")};
  color: ${props => (props.active ? "white" : "#666")};
  font-family: S-CoreDream-5Medium;
  font-size: 16px;
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => (props.active ? "#85c8f2" : "#f0f0f0")};
  }
`;

export const AdminContent = styled.div`
  flex: 1;
  background: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  h3 {
    font-family: S-CoreDream-6Bold;
    font-size: 24px;
    color: #333;
  }
`;

export const AddButton = styled.button`
  padding: 12px 24px;
  background: #85c8f2;
  color: white;
  border: none;
  border-radius: 10px;
  font-family: S-CoreDream-5Medium;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #6bb6e8;
  }
`;

export const DataTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.thead`
  th {
    padding: 15px;
    background: #f8f9fa;
    font-family: S-CoreDream-6Bold;
    font-size: 14px;
    color: #333;
    text-align: left;
    border-bottom: 2px solid #e0e0e0;
  }
`;

export const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #e0e0e0;

    &:hover {
      background: #f8f9fa;
    }
  }

  td {
    padding: 15px;
    font-family: S-CoreDream-4Regular;
    font-size: 14px;
    color: #333;
  }
`;

export const StatusBadge = styled.span<{ active: boolean }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-family: S-CoreDream-5Medium;
  font-size: 12px;
  background: ${props => (props.active ? "#d4edda" : "#f8d7da")};
  color: ${props => (props.active ? "#155724" : "#721c24")};
`;

export const ActionButton = styled.button<{ edit?: boolean; delete?: boolean }>`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  font-family: S-CoreDream-4Regular;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  ${props =>
    props.edit &&
    `
    background: #ffc107;
    color: #000;
    
    &:hover {
      background: #e0a800;
    }
  `}

  ${props =>
    props.delete &&
    `
    background: #dc3545;
    color: white;
    
    &:hover {
      background: #c82333;
    }
  `}
`;

export const PortfolioSection = styled.div``;
export const StorySection = styled.div``;
export const CommentSection = styled.div``;
export const ResumeSection = styled.div``;
