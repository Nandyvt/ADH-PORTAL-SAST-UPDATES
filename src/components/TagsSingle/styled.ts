import styled from "styled-components";

export const BadgeContainer = styled.div`
  width: 100%;
  gap: 8px;
  display: flex;
  flex-wrap: wrap;
  .badge {
    display: inline-block;
  }
  .zindextoggle {
    position: relative;
    z-index: 10;
  }
`;

export const MoreBadge = styled.button`
  position: relative;
  background-color: #d0021b;
  color: #fff;
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  padding: 4px 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 8px;
  display: inline-block;
  white-space: nowrap;
  width: 30px;
  height: 30px;
  top: -4px;
  &:hover {
    background-color: #b00118;
  }
`;

export const Popover = styled.div`
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #e3e3e3;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 5;
  padding-right: 8px;
  border-radius: 6px;
  top: 56%;
  left: 15%;
  padding-top: 50px;
`;

export const PopoverBadge = styled.div`
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
`;
