import styled from "styled-components";


interface iTagProps{
  color: string
}

export const Container = styled.div`
  background-color: ${props => props.theme.colors.tertiary};
  list-style: none;
  border-radius: 5px;

  margin: 10px;
  padding: 12px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  transition: all .3s;

  position: relative;

  &:hover{
    opacity: .7;
    transform: translateX(5px);
  }

  > div{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 8px;
  }

  > div span{
    font-weight: 500;
    font-size: 18px;
  }
`;

export const Tag = styled.div<iTagProps>`
  position: absolute;

  width: 10px;
  height: 60%;

  border-radius: 2px;

  background-color: ${props => props.color};
  left: 0;
`;