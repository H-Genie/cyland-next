import React from "react";
import * as Style from "../Admin.styles";

interface SectionHeaderProps {
  title: string;
  showAddButton?: boolean;
  addButtonText?: string;
  onAddClick?: () => void;
}

export default function SectionHeader({
  title,
  showAddButton = false,
  addButtonText = "추가",
  onAddClick
}: SectionHeaderProps) {
  return (
    <Style.SectionHeader>
      <h3>{title}</h3>
      {showAddButton && (
        <Style.AddButton onClick={onAddClick}>{addButtonText}</Style.AddButton>
      )}
    </Style.SectionHeader>
  );
}

