import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import DefaultLayout from "../layout/default";
import focusService from "../apis/focus/focusService";

const FocusDetails = () => {
  const { id } = useParams();
  const [focus, setFocus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [focusElements, setFocusElements] = useState([]);
  const [loadingElements, setLoadingElements] = useState(true);
  const [errorElements, setErrorElements] = useState('');


  useEffect(() => {
    const fetchFocusDetails = async () => {
      try {
        const data = await focusService.getFocusById(id);
        setFocus(data);
      } catch (error) {
        console.log('Error fetching focus details:', error);
        setError('Error fetching focus details');
      } finally {
        setLoading(false);
      }
    };

    fetchFocusDetails();
  }, [id]);

  useEffect(() => {
    const fetchFocusElements = async () => {
      try {
        const data = await focusService.getAllFocusElements(id);
        setFocusElements(data);
      } catch (error) {
        console.log('Error fetching focus elements:', error);
        setErrorElements('Error fetching focus elements');
      } finally {
        setLoadingElements(false);
      }
    }
    fetchFocusElements();
  }, [id]);

  return (
    <DefaultLayout>
      <Container className="mt-5">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {focus && (
          <Row className="justify-content-center">
            <Col md={8}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title className="fs-3">{focus.name}</Card.Title>
                  <Card.Text>{focus.description}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <small className={`badge bg-${focus.state ? 'success' : 'danger'}`}>
                      {focus.state ? 'Activo' : 'Inactivo'}
                    </small>
                    <small className="text-muted">ID: {focus.id}</small>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* visualizar elementos del focus */}
        {loadingElements && <p className="text-center">Loading...</p>}
        {errorElements && <p className="text-danger text-center">{errorElements}</p>}
        {focusElements.length > 0 && (
          <Row className="mt-5">
            <Col md={8}>
              <h2>Elementos del Focus</h2>
              <ul>
                {focusElements.map((element) => (
                  <li key={element.id}>{element.name}</li>
                ))}
              </ul>
            </Col>
          </Row>
        )}
      </Container>
    </DefaultLayout>
  );
};

export default FocusDetails;
