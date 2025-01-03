import { Col, Container, Row, Pagination, Card } from "react-bootstrap";
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
        {/* Título centrado */}
        <Row className="text-center mb-4">
          <Col>
            <h1 className="display-4 fw-bold">Focus</h1>
          </Col>
        </Row>

        {/* Párrafo explicativo destacado */}
        <Row className="justify-content-center mb-5">
          <Col md={10} lg={8}>
            <div className="p-4  rounded shadow-sm text-center">
              <p className="mb-0">
                Los focus son espacios donde puedes organizar elementos o conjuntos que tengan un objetivo en común, como una serie de fotos de un cultivo o información específica de una temática.
              </p>
            </div>
          </Col>
        </Row>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {!loading && !error && (
          <Row className="g-3">
            {focusList.map((focus) => (
              <Col xs={12} sm={6} lg={4} key={focus.id}>
                <Card className="h-100 shadow-sm border-10">
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <div>
                      <Card.Title className="fs-5 text-truncate">{focus.name}</Card.Title>
                      <Card.Text className="text-muted">
                        {focus.description.length > 100 ? `${focus.description.substring(0, 100)}...` : focus.description}
                      </Card.Text>
                    </div>
                    <div className="mt-2">
                      <Card.Text>
                        <div className="d-flex justify-content-between">
                          <small className={`badge bg-${focus.state ? 'success' : 'danger'}`}>
                            {focus.state ? 'Activo' : 'Inactivo'}
                          </small>
                          <small className="text-muted">ID: {focus.id}</small>
                        </div>
                      </Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Pagination */}
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 1} />
          <Pagination.Item active>{page}</Pagination.Item>
          <Pagination.Next onClick={() => handlePageChange(page + 1)} />
        </Pagination>
      </Container>
    </DefaultLayout>
  );
};

export default Focus;
