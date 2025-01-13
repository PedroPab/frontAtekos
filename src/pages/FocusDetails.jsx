import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import DefaultLayout from "../layout/default";
import focusService from "../apis/focus/focusService";
import FocusElementCard from "../components/focus/FocusElementCard";
import PaginationComponent from "../components/PaginationComponent";
import CardCreate from "../components/CardCreate";
import FocusCard from "../components/focus/FocusCard";
import CreateFocusElementModal from "../components/focus/CreateFocusElementModal";
import focusElementService from "../apis/focus/focusElementService";

const FocusDetails = () => {
  const { id } = useParams();
  const [focus, setFocus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [focusElements, setFocusElements] = useState([]);
  const [loadingElements, setLoadingElements] = useState(true);
  const [errorElements, setErrorElements] = useState('');

  const [newFocusElement, setNewFocusElement] = useState({
    name: '',
    description: '',
    photo: {},
    type: '',
  });

  //modal
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log('name:', name, 'value:', value);

    if (name === 'photo') {
      setNewFocusElement({ ...newFocusElement, [name]: files[0] });
    } else {
      setNewFocusElement({ ...newFocusElement, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newFocusElement.name);
    console.table(e)
    console.log(e)
    formData.append('photo', newFocusElement.photo);
    console.log(newFocusElement.photo)
    formData.append('type', newFocusElement.type);

    try {
      await focusElementService.createElement(focus.id, formData);
      setFocusElements([...focusElements, newFocusElement]);
      handleCloseModal();
    } catch (error) {
      console.log('Error creating focus:', error);
      setError('Error creating focus');
    }
  };

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

        <CreateFocusElementModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          newFocusElement={newFocusElement}
        />
      </Container>
    </DefaultLayout>
  );
};

export default FocusDetails;
