import { Container, Row, Col } from "react-bootstrap";
import DefaultLayout from "../layout/default";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import focusService from "../api/focusService";
import FocusCard from "../components/FocusCard";

const FocusDetail = () => {
  const { id } = useParams();
  const [focus, setFocus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFocus = async () => {
      try {
        const data = await focusService.getFocusById(id);
        setFocus(data);
      } catch (error) {
        console.log('Error fetching focus:', error);
        setError('Error fetching focus');
      } finally {
        setLoading(false);
      }
    };

    fetchFocus();
  }, [id]);

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
      </Container>
    </DefaultLayout>
  );
};

export default FocusDetail;
