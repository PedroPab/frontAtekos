import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DefaultLayout from "../layout/default";
import focusService from "../apis/focus/focusService";
import FocusElementCard from "../components/focus/FocusElementCard";
import PaginationComponent from "../components/PaginationComponent";
import CardCreate from "../components/CardCreate";
import FocusCard from "../components/focus/FocusCard";

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
  }, [id, page]); // Agregar 'page' a la lista de dependencias

  const handleShowModal = () => {
    console.log('Show modal');
    //abrimos un modal para crear un elemento nuevo en el focus

  }

  return (
    <DefaultLayout>
      <Container className="mt-5">
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        {focus && (
          <Row className="justify-content-center">
            <Col md={8}>
              <FocusCard focus={focus} />
            </Col>
          </Row>
        )}

        {/* Lista
        {/* visualizar elementos del focus */}
        {loadingElements && <p className="text-center">Loading...</p>}
        {errorElements && <p className="text-danger text-center">{errorElements}</p>}

        <Row className="mt-5">
          <h2>Elementos del Focus</h2>
          <Row className="g-3">
            <Col xs={12} sm={6} lg={4}>
              <CardCreate handleShowModal={handleShowModal}
                messageText='Crear un nuevo elemento'
              />
            </Col>
            {focusElements.length > 0 && (
              focusElements.map((element) => (
                <Col xs={12} sm={6} lg={4} key={element.id}>
                  <FocusElementCard key={element.id} element={element} />
                </Col>
              ))
            )}
          </Row>
        </Row>



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
