import { Row, Col } from "antd";
import ApartmentCard from "./components/ApartmentCard/ApartmentCard";

const ApartmentList = ({ apartments, onSelect }) => (
  <Row gutter={[24, 24]} justify="start">
    {apartments.map((apt) => (
      <Col key={apt.id} xs={24} sm={24} md={12} lg={12} xl={8}>
        <ApartmentCard apartment={apt} onClick={() => onSelect(apt)} />
      </Col>
    ))}
  </Row>
);

export default ApartmentList;
