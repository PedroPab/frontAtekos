import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import DefaultLayout from "../layout/default";
import focusService from "../apis/focus/focusService";
import FocusElementCard from "../components/focus/FocusElemntCard";
import PaginationComponent from "../components/PaginationComponent";
import CardCreate from "../components/CardCreate";

const FocusDetails = () => {
  const { id } = useParams();
  const [focus, setFocus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [focusElements, setFocusElements] = useState([]);
  const [loadingElements, setLoadingElements] = useState(true);
  const [errorElements, setErrorElements] = useState('');

  //pagination
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 5;
  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  //datos del focus
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

  //elementos del focus
  useEffect(() => {
    const fetchFocusElements = async () => {
      try {
        const data = await focusService.getAllFocusElements(id, { page, limit });
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

  const handleShowModal = () => {
    console.log('Show modal');
  }

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

        {/* Lista
        {/* visualizar elementos del focus */}
        {loadingElements && <p className="text-center">Loading...</p>}
        {errorElements && <p className="text-danger text-center">{errorElements}</p>}
        {focusElements.length > 0 && (
          <Row className="mt-5">
            <h2>Elementos del Focus</h2>
            <Row className="g-3">
              <Col xs={12} sm={6} lg={4}>
                <CardCreate handleShowModal={handleShowModal}
                  messageText='Crear un nuevo elemento'
                />

              </Col>
              {focusElements.map((element) => (
                <Col xs={12} sm={6} lg={4} key={element.id}>
                  <FocusElementCard key={element.id} element={element} />
                </Col>
              ))}
            </Row>
          </Row>
        )}

        {/* pagination */}
        <div className="text-center mt-4">
          <PaginationComponent
            page={page}
            handlePageChange={handlePageChange}
          />
        </div>
      </Container>
    </DefaultLayout>
  );
};

export default FocusDetails;
