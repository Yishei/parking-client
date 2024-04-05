import { CarOutlined, HomeOutlined } from "@ant-design/icons";
import { MdPayment, MdOutlineHowToVote } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { RiContactsLine, RiGitPullRequestLine } from "react-icons/ri";
import { CgDanger, CgFileDocument } from "react-icons/cg";
import { NavLink } from "react-router-dom";

export const items = [
  {
    key: 1,
    label: <NavLink to={`/resident/home/:unitId`}>Home</NavLink>,
    icon: <HomeOutlined />,
  },
  {
    key: 2,
    label: <NavLink to={`/resident/cars/:unitId`}>Cars</NavLink>,
    icon: <CarOutlined />,
  },
  {
    key: 3,
    label: <NavLink to={`/resident/payments/:unitId`}>Payments</NavLink>,
    icon: <MdPayment />,
  },
  {
    key: 4,
    label: <NavLink to={`/resident/requests/:unitId`}>Requests</NavLink>,
    icon: <RiGitPullRequestLine />,
  },
  {
    key: 5,
    label: `Announcements`,
    icon: <TfiAnnouncement />,
  },
  {
    key: 6,
    label: `Violations`,
    icon: <CgDanger />,
  },
  {
    key: 7,
    label: `Documents`,
    icon: <CgFileDocument />,
  },
  {
    key: 8,
    label: `Voting`,
    icon: <MdOutlineHowToVote />,
  },
  {
    key: 9,
    label: `Contacts`,
    icon: <RiContactsLine />,
  },
];
