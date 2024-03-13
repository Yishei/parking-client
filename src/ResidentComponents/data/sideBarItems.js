import { CarOutlined, HomeOutlined } from "@ant-design/icons";
import {
  MdOutlineApartment,
  MdPayment,
  MdOutlineHowToVote,
} from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { RiContactsLine, RiGitPullRequestLine } from "react-icons/ri";
import { CgDanger, CgFileDocument } from "react-icons/cg";

export const items = [
  {
    key: 1,
    label: `Home`,
    icon: <HomeOutlined />,
  },
  {
    key: 3,
    label: `Cars`,
    icon: <CarOutlined />,
  },
  {
    key: 4,
    label: `Payments`,
    icon: <MdPayment />,
  },
  {
    key: 5,
    label: `Requests`,
    icon: <RiGitPullRequestLine />,
  },
  {
    key: 6,
    label: `Announcements`,
    icon: <TfiAnnouncement />,
  },
  {
    key: 7,
    label: `Violations`,
    icon: <CgDanger />,
  },
  {
    key: 8,
    label: `Documents`,
    icon: <CgFileDocument />,
  },
  {
    key: 9,
    label: `Voting`,
    icon: <MdOutlineHowToVote />,
  },
  {
    key: 10,
    label: `Contacts`,
    icon: <RiContactsLine />,
  },
];
