// Stream table, ordered newest first — the YR column makes the sort visible.
// Rows without a `url` are internal systems with no public link; they render as
// plain text rather than a link. `hi` marks the one phrase in a row that carries
// an accent — keep these rare, they stop working if overused. `alt` is a second
// link for work published in more than one place.
export const streams = [
  {
    tag: "S-01",
    name: "Money Mule Detection",
    url: null,
    hi: null,
    desc: "Took the fraud team's model into production and kept it running — serving endpoint, feature store, isolated compute, batch and autoblock paths. On-call owner.",
    stack: "SageMaker · BigQuery",
    year: "2026",
  },
  {
    tag: "S-02",
    name: "Cards Fraud Scoring",
    url: null,
    hi: null,
    desc: "Batch deployment, scheduling and alerting for the cards fraud model across dev and production.",
    stack: "Cloud Run · GCP",
    year: "2026",
  },
  {
    tag: "S-03",
    name: "RealEstimate",
    url: "https://github.com/bhaskoro-muthohar/RealEstimate",
    hi: null,
    desc: "Mortgage and property cost calculator. Running at U-B below.",
    stack: "FastAPI",
    year: "2025",
  },
  {
    tag: "S-04",
    name: "CoMaGraph",
    url: "https://github.com/bhaskoro-muthohar/CoMaGraph",
    hi: null,
    desc: "Context management for conversational systems — graph store plus embeddings.",
    stack: "Neo4j · embeddings",
    year: "2024",
  },
  {
    tag: "S-05",
    name: "Credit Scoring Pipeline",
    url: "https://github.com/bhaskoro-muthohar/Credit-Scoring-Deployment",
    hi: null,
    desc: "Training through serving as one deployable unit. Ensemble model behind an API.",
    stack: "FastAPI · sklearn",
    year: "2024",
  },
  {
    tag: "S-06",
    name: "Auto Paired T-test",
    url: "https://github.com/bhaskoro-muthohar/auto-paired-ttest",
    hi: null,
    desc: "Statistical testing wired into CI so results arrive with the build.",
    stack: "Python · CI/CD",
    year: "2024",
  },
  {
    tag: "S-07",
    name: "A/B Testing on Government Digital Products",
    url: "https://journal.unesa.ac.id/index.php/jpsi/article/view/20964",
    hi: "Peer-reviewed, second of four authors.",
    desc: "Randomised trials on a national teacher-training platform. Submission rate up 590% in two months.",
    alt: {
      label: "Practitioner write-up",
      url: "https://medium.com/inadigital-edu/experimentation-culture-at-govtech-edu-how-we-utilize-a-b-testing-method-to-build-data-driven-a9a00c14c1a4",
    },
    stack: "JPSI · Vol 7(2)",
    year: "2023",
  },
  {
    tag: "S-08",
    name: "Kalender Padi Nusantara",
    url: "https://github.com/bhaskoro-muthohar/KaPaN",
    hi: "UN Datathon 2023 — Best Team in Asia.",
    desc: "Rice planting calendar built from open agricultural data.",
    stack: "Python · geospatial",
    year: "2023",
  },
  {
    tag: "S-09",
    name: "Oeroenremboog",
    url: "https://github.com/bhaskoro-muthohar/oeroenremboog",
    hi: null,
    desc: "Exploratory data visualisation on a local-first analytics stack.",
    stack: "Streamlit · DuckDB",
    year: "2023",
  },
];

// Services actually online, as opposed to source in the table above.
// `credit` marks software someone else wrote that is merely hosted here.
export const operations = [
  {
    tag: "U-A",
    host: "itsmebhas.net",
    url: "https://www.itsmebhas.net",
    desc: "This sheet.",
    stack: "Next.js",
  },
  {
    tag: "U-B",
    host: "realestimate.itsmebhas.net",
    url: "https://realestimate.itsmebhas.net",
    desc: "Mortgage and property cost calculator. Source at S-03.",
    stack: "FastAPI",
  },
  {
    tag: "U-C",
    host: "opengym.itsmebhas.net",
    url: "https://opengym.itsmebhas.net",
    desc: "Gym tracker I run for myself. Not my code — hosted, not built.",
    stack: "Docker",
    credit: {
      label: "Upstream: DuarteSantos/openGym · AGPL-3.0",
      url: "https://gitea.com/DuarteSantos/openGym",
    },
  },
];

export const opsNote =
  "All three run on one Debian VPS behind Caddy — systemd units and a container stack, release-per-commit with health-checked rollback, deployed by GitHub Actions.";

export const connections = [
  {
    label: "GitHub",
    handle: "bhaskoro-muthohar",
    url: "https://github.com/bhaskoro-muthohar",
  },
  {
    label: "LinkedIn",
    handle: "bhaskoro-muthohar",
    url: "https://www.linkedin.com/in/bhaskoro-muthohar",
  },
  { label: "X", handle: "@Br__AM", url: "https://twitter.com/Br__AM" },
  {
    label: "Instagram",
    handle: "bhaskoro.muthohar",
    url: "https://instagram.com/bhaskoro.muthohar",
  },
];
