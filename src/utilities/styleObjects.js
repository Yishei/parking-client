export const mainCardHeadStyle = {
  textAlign: "center",
  fontSize: "20px",
  fontWeight: "bold",
  color: "#1890ff",
  backgroundColor: "#f0f2f5",
  padding: "10px",
};

export const mainCardStyle = {
  width: "100%",
  backgroundColor: "transparent",
};

export const LoadingIndecatorStyle = {
  animation: `
@keyframes move {
  0% { transform: translateX(-100%); }
  50% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
`,
  color: "#52c41a",
  divStyle: {
    testAlign: "center",
  },
  iconStyle: {
    fontSize: 75,
    animation: "move 2s infinite",
  },
};
