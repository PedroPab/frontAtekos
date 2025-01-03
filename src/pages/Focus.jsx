import { Col, Container, Row, Pagination, Card } from "react-bootstrap";
import DefaultLayout from "../layout/default";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import focusService from "../api/focusService";
import FocusCard from "../components/FocusCard";
import FocusModal from "../components/FocusModal";
import PaginationModal from "../components/PaginationModal";

const Focus = () => {
  const [focusList, setFocusList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = 5;
  const [showModal, setShowModal] = useState(false);
  const [newFocus, setNewFocus] = useState({ name: '', description: '', id: '' });
  const [showPaginationModal, setShowPaginationModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowPaginationModal = () => setShowPaginationModal(true);
  const handleClosePaginationModal = () => setShowPaginationModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFocus({ ...newFocus, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await focusService.createFocus(newFocus);
      setFocusList([...focusList, newFocus]);
      handleCloseModal();
    } catch (error) {
      console.log('Error creating focus:', error);
      setError('Error creating focus');
    }
  };

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
        <Row className="g-3">
          {/* Tarjeta para crear un nuevo focus */}
          <Col xs={12} sm={6} lg={4}>
            <Card className="h-100 shadow-sm border-10" onClick={handleShowModal}>
              <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                <Card.Title className="fs-1">+</Card.Title>
                <Card.Text className="text-muted text-center">
                  Crear nuevo focus
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          {/* Lista de focus */}
          {!loading && !error && focusList.map((focus) => (
            <Col xs={12} sm={6} lg={4} key={focus.id}>
              <FocusCard focus={focus} />
            </Col>
          ))}
        </Row>

        {/* Botón para abrir el modal de paginación */}
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={handleShowPaginationModal}>
            Cambiar página
          </button>
        </div>
      </Container>

      <FocusModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newFocus={newFocus}
      />

      <PaginationModal
        showModal={showPaginationModal}
        handleCloseModal={handleClosePaginationModal}
        page={page}
        handlePageChange={handlePageChange}
      />
    </DefaultLayout>
  );
};

export default Focus;
