import styled from 'styled-components';
import { Link } from 'react-router-dom';

type FilterListProps = {
  active: number;
}

export const Loading = styled.header`
  display: flex;
  color: #fff;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 150px;
    border-radius: 20px;
    margin: 20px 0;
  }

  h1 {
    font-size: 30px;
    color: #0D2636;
  }

  p {
    font-size: 14px;
    color: #000;
    line-height: 1.4;
    text-align: center;
    margin-top: 5px;
    max-width: 400px;
  }
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const IssueList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li {
    display: flex;
    padding: 15px 10px;

    & + li {
      margin-top: 12px;
    }

    img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: 2px solid #0D2636;
    }

    div {
      flex: 1;
      margin-left: 12px;

      p {
        margin-top: 10px;
        font-size: 12px;
        color: #000;
      }
    }

    strong {
      font-size: 15px;
      trasfor: 0.3s;

      a {
        text-decoration: none;
        colot: #222;

        &:hover {
          color: #0071db;
        }
      }

      div {
        margin-left: 0;
        margin-top: 5px;

        span {
          font-size: 12px;
          font-weight: 600;
          color: #fff;
          background: #222;
          border-radius: 4px;
          padding: 5px 7px;
  
          & + span {
            margin-left: 10px;
          }               
        }
      }
    }
  }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #eee;;

  button {
    outline: 0;
    border: 0;
    background: #222;
    color: #FFF;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const FilterList = styled.div<FilterListProps>`
  margin: 15px 0;

  button {
    outline: 0;
    border: 0;
    padding: 8px;
    margin: 0 3px;
    border-radius: 0 3px;

    &:nth-child(${props => props.active + 1}) {
      background: #0071db;
      color: #FFF;
    }
  }
`;