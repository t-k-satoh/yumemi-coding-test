import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

export const Main = styled.main``

export const Buttons = styled.div``

export const CheckBoxes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`

export const CheckBox = styled.div``

export const Dot = styled.span<{ color: string }>`
  height: 14px;
  width: 14px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  display: inline-block;
`

export const Cart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 500px;
`

export const Loader = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 2s linear infinite;
`
