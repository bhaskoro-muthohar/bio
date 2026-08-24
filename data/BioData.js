const bioData = {
  name: "Bhaskoro Abdillah Muthohar",
  shortName: "Bhaskoro Muthohar",
  role: "Machine Learning Engineer",
  url: "https://www.itsmebhas.net",
  avatar: "/bhaskoro-muthohar-profile.jpeg",

  // Drawing title-block fields
  titleBlock: [
    { label: "Sheet", value: "itsmebhas.net" },
    { label: "Operator", value: "StraitsX" },
    { label: "Location", value: "Indonesia · UTC+7" },
    { label: "Revision", value: "2026" },
  ],

  // Career as tagged unit operations
  units: [
    {
      tag: "Feed",
      title: ["Chemical", "Engineering"],
      meta: "B.Eng · self-taught out",
      terminal: true,
    },
    { tag: "U-01", title: ["Data", "Analyst"], meta: "3 yr" },
    { tag: "U-02", title: ["Analytics", "Engineer"], meta: "2 yr" },
    {
      tag: "U-03 · LIVE",
      title: ["Data / ML", "Engineer"],
      meta: "since Feb 2025",
      live: true,
    },
    {
      tag: "Product",
      title: ["Systems in", "Production"],
      meta: "models · pipelines · platform",
      terminal: true,
    },
  ],

  priorOperators: "Bank Jago · GovTech Edu Indonesia",

  notes: [
    "I started in chemical engineering and taught myself out of it. The diagram didn't change much — feedstock, unit operations, a product stream, and instrumentation on every stage. Only the units did.",
    "Today that means machine learning and data infrastructure in payments. Most of what I do is getting models into production and keeping them there, and building the pipelines and platform they run on.",
    "I build in phases and I measure what I build.",
  ],

  readout: [
    {
      label: "Current",
      value: "Model deployment & serving · data platform · internal AI agents",
    },
    {
      label: "Stack",
      value: "Python · SQL · BigQuery · dbt · Airflow · GCP · AWS · Terraform",
    },
    {
      label: "In commissioning",
      value: "Agent evaluation · streaming ingestion · model monitoring",
    },
  ],

  footerText: "Bhaskoro Abdillah Muthohar",
};

export default bioData;
