import React from "react";
import {Container, Header, Title, Logo, MenuContainer, MenuItemLink} from './styles';
import {MdDashboard, MdArrowDownward, MdArrowUpward, MdExitToApp} from 'react-icons/md';
import logo from '../../assets/logo.svg';

const Aside: React.FC = () => {
  return(
    <Container>
      <Header>
        <Logo src={logo} alt="Logo do Controle Financeiro"/>
        <Title>Controle Financeiro</Title>
      </Header>

      <MenuContainer>
        <MenuItemLink href="/dashboard"> <MdDashboard/> Dashboard</MenuItemLink>
        <MenuItemLink href="/list/entry-balance"> <MdArrowUpward/> Entradas</MenuItemLink>
        <MenuItemLink href="/list/exit-balance"> <MdArrowDownward/> Saidas</MenuItemLink>
        <MenuItemLink href="#"> <MdExitToApp/> Sair</MenuItemLink>
      </MenuContainer>
    </Container>
  )
}

export default Aside