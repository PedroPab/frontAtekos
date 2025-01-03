import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import DefaultLayout from "../layout/default";
import focusService from "../api/focusService";

const FocusDetails = () => {
  const { id } = useParams();
  const [focus, setFocus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      </Container>
    </DefaultLayout>
  );
};

export default FocusDetails;
