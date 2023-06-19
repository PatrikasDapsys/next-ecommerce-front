import styled from "styled-components";

const StyledDiv = styled.div`
    max-width: 800px;
    margin: 0 auto; 
`

export default function Center({children}) {
    return(
        <StyledDiv>{children}</StyledDiv>
    );
}