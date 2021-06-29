import React from "react";
import {Container, ToggleLabel, ToggleSelector} from './styles';

const Toggle: React.FC = () => {
  return(
    <Container>
      <ToggleLabel>Light</ToggleLabel>
      <ToggleSelector 
        onChange={() => { console.log('mudou')}} 
        checked={false}
        uncheckedIcon={false}
        checkedIcon={false}
      />
      <ToggleLabel>Dark</ToggleLabel>
    </Container>
  )
}

export default Toggle;