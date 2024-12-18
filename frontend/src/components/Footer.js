import React from 'react'
import "../styles/Footer.css"
const Footer = () => {
const year =new Date();

  return (
    <footer>Copyright &copy; FurnHub {year.getFullYear()}</footer>
  )
}

export default Footer