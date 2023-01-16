import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './fonts.css';
import feed from './feed.json';

const Wire = ({ date, title, text }) => {
  const [showModal, setShowModal] = useState(false);
  const shortText = text.slice(0, 200);
  const ellipsis = text.length > 200 ? "..." : "";
  const dateObject = new Date(date);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = dateObject.toLocaleDateString('en-GB', options);

  return (
    <Col xs={12} md={6} lg={4}>
      <div className="box-items">
        <span>{formattedDate}</span>
        <h2>{title}</h2>
        <p>{shortText}{ellipsis}</p>
        <Button variant="primary" className="read-more-btn" onClick={() => setShowModal(true)}>
          Read more
        </Button>
        <Modal className="read-more-modal" show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{formattedDate}</p>
            {text}
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between">
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Col>
  );
};

const App = () => {
  const [desc, setDesc] = useState(feed.desc);
  const [wiresData, setWiresData] = useState(feed.wires.slice(0, 6));
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    try {
      // retrieve the next 6 wires
      const nextWires = feed.wires.slice(page*6, (page+1)*6);
      // update the wires state with the new data
      setWiresData([...wiresData, ...nextWires]);
      setPage(page + 1);
      // check if all wires have been loaded
      if (page*6 >= feed.wires.length) {
        setIsLoading(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Wireframe</title>
      </Helmet>
      <header>
      </header>
      <nav className="navbar fixed-top">
        <Container>
        </Container>
      </nav>
      <section>
        <Container>
          <Row>
            <Col xs={12}>
              <h1>{desc.title}</h1>
              <p>{desc.text}</p>
            </Col>
          </Row>
        </Container>
      </section>
      <article>
        <Container>
          <Row className="flex-wrap">
            {wiresData.map((wire, index) => (
              <Wire key={index} title={wire.title} text={wire.text} date={wire.date} />
            ))}
          </Row>
        </Container>
        <Container>
          <div className="text-center">
              <Button
                  onClick={loadMore}
                  disabled={isLoading || page*6 >= feed.wires.length}
                  className="btn"
              >
                  {isLoading ? 'Loading...' : page*6 >= feed.wires.length ? 'End of feed' : 'Load more'}
              </Button>
          </div>
        </Container>
      </article>
      <aside>
      </aside>
      <footer>
      </footer>
    </div>
  );
};

export default App;
// Ashiwin Kumar for Dobi Queen, 2023
