import { Col, Container, Row, Form, Button, Pagination, Card } from "react-bootstrap";
import DefaultLayout from "../layout/default";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import focusService from "../api/focusService";

const Focus = () => {
  const [focusList, setFocusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 5;

  useEffect(() => {
    const fetchFocus = async () => {
      try {
        const data = await focusService.getAllFocus({ page, limit });
        setFocusList(data);
      } catch (error) {
        console.log('Error fetching focus:', error);
        setError('Error fetching focus');
      } finally {
        setLoading(false);
      }
    };

    fetchFocus();
  }, [page]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  return (
    <DefaultLayout>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h1>Focus</h1>

            {/* Lista de cards de los focus */}
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && (
              <Row>
                {focusList.map((focus) => (
                  <Col md={6} lg={4} className="mb-4" key={focus.id}>
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <Card.Title>{focus.name}</Card.Title>
                        <Card.Text>{focus.description}</Card.Text>
                        <Card.Text>
                          <small className="text-muted">Creado: {new Date(focus.dateCreate).toLocaleDateString()}</small>
                        </Card.Text>
                        <Card.Text>
                          <small className="text-muted">Actualizado: {new Date(focus.dateUpdate).toLocaleDateString()}</small>
                        </Card.Text>
                        <Card.Text>
                          <small className={`text-${focus.state ? 'success' : 'danger'}`}>
                            Estado: {focus.state ? 'Activo' : 'Inactivo'}
                          </small>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
            {/* Sistema de paginación */}
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
              <Pagination.Item active>{page}</Pagination.Item>
              <Pagination.Next onClick={() => handlePageChange(page + 1)} />
            </Pagination>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
}

export default Focus;
