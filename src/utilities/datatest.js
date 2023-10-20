export const CondoData = [
  {
    condo_id: "1",
    city: "New York",
    state: "NY",
    lot_count: 10,
    resident_count: 20,
  },
  {
    condo_id: "2",
    city: "New York",
    state: "NY",
    lot_count: 11,
    resident_count: 20,
  },
  {
    condo_id: "1",
    city: "New York",
    state: "NY",
    lot_count: 10,
    resident_count: 20,
  },
  {
    condo_id: "2",
    city: "New York",
    state: "NY",
    lot_count: 11,
    resident_count: 20,
  },
];

export const UnitData = [
  {
    unit_id: "1",
    condo_id: "1",
    address: "123 Main St",
    resident_id: "1",
    resident_name: "John Doe",
    max_occupancy: 10,
  },
  {
    unit_id: "2",
    condo_id: "1",
    address: "123 Main St",
    resident_id: "1",
    resident_name: "John Doe",
    max_occupancy: 10,
  },
];

export const LotData = [
  {
    lot_id: "1",
    condo_id: "1",
    address: "123 Main St",
    lot_name: "Lot 1",
    locked: true,
    camera_count: 10,
  },
  {
    lot_id: "2",
    condo_id: "1",
    address: "123 Main St",
    lot_name: "Lot 1",
    camera_count: 10,
  },
  {
    lot_id: "3",
    condo_id: "1",
    address: "123 Main St",
    lot_name: "Lot 1",
    camera_count: 10,
  },
  {
    lot_id: "4",
    condo_id: "2",
    address: "123 Main St",
    lot_name: "Lot 1",
    camera_count: 10,
  },
];

export const CameraData = [
  {
    camera_id: "1",
    condo_id: "1",
    lot_id: "1",
    data_source_camera_id: "1123358",
  },
  {
    camera_id: "2",
    condo_id: "1",
    lot_id: "1",
    data_source_camera_id: "1123358",
  },
  {
    camera_id: "3",
    condo_id: "1",
    lot_id: "1",
    data_source_camera_id: "1123358",
  },
];

export const UserData = [
  {
    user_id: "1",
    condo_id: "1",
    username: "John Doe",
    email: "john@test.com",
    phone_number_main: "123-456-7890",
    is_active: true,
    unit_count: 10,
  },
  {
    user_id: "2",
    condo_id: "1",
    username: "John Doe",
    email: "sldfks",
    phone_number_main: "123-456-7890",
    is_active: false,
    unit_count: 10,
  },
];
