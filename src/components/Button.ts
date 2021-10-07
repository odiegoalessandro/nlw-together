import styled from "@emotion/styled"

export default styled.button`
  height: 50px;
  background: #885afd;
  transition: filter .2s;
  display: flex;
  font-weight: 500;
  color: #fff;
  margin-top: 16px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  img {
    margin-right: 8px;
  }
  &:not(:disabled):hover {
    filter: brightness(0.9);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`
