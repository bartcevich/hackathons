'use client';
import { Container, Dropdown, DropdownButton, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '../../assets/images/promobot.png'



export default function Navigation() {
    return (
        <div className={styles.wrapper}>
            <Navbar expand="sm" bg='transparent' data-bs-theme="bg='transparent'" className={styles.navbar}>
            <Container className={styles.container}>
                {/* <Navbar.Brand href='/' className={`${styles.logo} ${styles.logo2}`}
                style={{ backgroundImage: `url(${logoImage.src})` }}></Navbar.Brand> */}
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' className={styles.menu_nav0}>
                <Nav className='me-auto'>
                    <Nav.Link href='/' className={styles.menu_nav1}>Главная</Nav.Link>
                    <NavDropdown id='dropdown-basic-button' title='Написать обращение' className={styles.menu_nav}>
                        <Dropdown.Item className={styles.menu_nav2}><Link href="/history">Министерство здравоохранения</Link></Dropdown.Item>
                        <Dropdown.Item className={styles.menu_nav2}><Link href="/Test">Министерство образования</Link></Dropdown.Item>
                    </NavDropdown>
                    <Nav.Link href='/' className={styles.menu_nav1}>Ответы на обращения</Nav.Link>
                    <NavDropdown id='dropdown-basic-button' title='Дополнительная информация' className={styles.menu_nav}>
                        <Dropdown.Item className={styles.menu_nav2}><Link href="/kids">Подтверждение получения</Link></Dropdown.Item>
                        <Dropdown.Item className={styles.menu_nav2}><Link href="/teenagers">...</Link></Dropdown.Item>
                        <Dropdown.Item className={styles.menu_nav2}><Link href="/programs">...</Link></Dropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div className={styles.sliderTitle}>
            </div>
            {/* ReactDOM.render( */}
              {/* <Switch> */}
                {/* <Route path="/" element={<Navigation />} /> */}
                {/* Other components and routes */}
              {/* </Switch> */}

              {/* <Router> */}
                {/* <Routes> */}
                   {/* <Route path="/history" element={<History />} /> */}
                {/* </Routes> */}
             {/* </Router> */}
            {/* //   document.getElementById(root) */}
        </div>
    );
}
