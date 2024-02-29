import React from 'react'
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { base_url } from '../services/baseUrl';


function Projectcard({ Project }) {
  console.log(Project);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <Card className='my-1' onClick={handleShow} style={{ width: '18rem' }}>
        <Card.Img variant="top" src={Project ? `${base_url}/uploads/${[Project.projectImage]}` : "empty img"} />
        <Card.Body>
          <Card.Title className='text-center'>{Project?.title}</Card.Title>

        </Card.Body>
      </Card>



      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{Project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <img style={{ width: '250px' }} src={Project ? `${base_url}/uploads/${[Project.projectImage]}` : "empty img"} alt="" />
            </Col>
            <Col>
              <h3>{Project?.title}</h3>
              <p><span><b>Project Review</b></span>{Project?.overview}</p>
              <p>Technology Used : <span><b>{Project?.language} </b></span></p>
            </Col>
          </Row>

        </Modal.Body>
        <Modal.Footer>
          <a href={Project?.github} variant="secondary" onClick={handleClose}>

            <i style={{ color: '#FFD700' }} class="fa-brands fa-github fs-5 fa-beat-fade"></i>
          </a>

          <a href={Project?.link} variant="primary" onClick={handleClose}>
            <i style={{ color: '#FFD700' }} class="fa-solid fa-link fs-5 fa-fade"></i>

          </a>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Projectcard