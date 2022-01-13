import styled, { css, keyframes } from 'styled-components';

type SubmitBtnProps = {
  loading: number;
}

type Error = {
  error: boolean
}

export const Container = styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;

  h1 {
    display: flex;
    align-items: center;
    flex-direction: row;
    font-size: 19px;

    svg {
      margin-right: 10px;
    }
  }
`;


export const Header = styled.header`
display: flex;
justify-content: space-between;
`;

// Creating button animation - spinner
const animate: any = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
  
`;

export const Form = styled.form<Error>`
  display: flex;
  flex-direction: row;
  margin-top: 30px;

  input {
    flex: 1;
    font-size: 17px;
    border: 1px solid ${(props: Error )=> (props.error ? '#FFF000' : '#DDD')};
    padding: 10px 15px;
    border-radius: 4px;

    &.errorActive {
      border: 1px solid red;
    }
  }
`;

export const SubmitButton = styled.button.attrs((props: SubmitBtnProps) => ({
  type: 'submit',
  disabled: props.loading
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0D2636;
  margin-left: 10px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${(props: SubmitBtnProps) => props.loading && 
    css`
      svg {
        animation: ${animate} 2s linear infinite;        
      }
    `
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 20px;

  li {
    display: flex;
    flex-diraction: row;
    align-items: center;
    justify-content: space-between;
    padding: 15px;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #0D2636;
    }
  }
`;

export const DeleteButton = styled.button.attrs({
  type: 'button'
})`
  background: transparent;
  color: #0D2636;
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;
`;