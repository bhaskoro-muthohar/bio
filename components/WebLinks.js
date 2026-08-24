import styled from "styled-components";
import useDarkMode from "../hooks/useDarkMode";
import bioData from "../data/BioData";
import {
  streams,
  operations,
  opsNote,
  connections,
} from "../data/LinksData";

const THEME_MODES = [
  ["system", "Sys"],
  ["light", "Light"],
  ["dark", "Dark"],
];

const lastWord = (s) => s.split(" ").slice(-1)[0];
const leadWords = (s) => {
  const words = s.split(" ").slice(0, -1);
  return words.length ? `${words.join(" ")} ` : "";
};

export default function ProcessSheet() {
  const { name, role, avatar, titleBlock, units, priorOperators, notes, readout, footerText } =
    bioData;
  const { choice, select } = useDarkMode();

  return (
    <Sheet>
      <TitleBlock>
        <TbHead>
          <TbName>
            <h1>
              Bhaskoro
              <br />
              Muthohar
            </h1>
            <p className="role">{role}</p>
          </TbName>
          <TbStamp>
            {/* Above the fold: eager, with intrinsic size to reserve layout */}
            <img src={avatar} alt={name} width="440" height="440" />
            <figcaption>Drawn by</figcaption>
          </TbStamp>
        </TbHead>
        <TbMeta>
          {titleBlock.map((field) => (
            <dl key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </dl>
          ))}
          <div className="display-cell">
            <span className="field-label" id="display-label">
              Display
            </span>
            <div className="seg" role="group" aria-labelledby="display-label">
              {THEME_MODES.map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={choice === value ? "on" : undefined}
                  aria-pressed={choice === value}
                  onClick={() => select(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </TbMeta>
      </TitleBlock>

      <Section>
        <SecHead>
          <h2>Process Line</h2>
          <span className="tag">CONTINUOUS · 6 YR</span>
        </SecHead>
        <div>
          <FlowLine>
            {units.map((unit) => (
              <Unit
                key={unit.tag}
                className={`${unit.live ? "live" : ""} ${
                  unit.terminal ? "terminal" : ""
                }`}
              >
                <span className="tagno">{unit.tag}</span>
                <h3>
                  {unit.title[0]}
                  <br />
                  {unit.title[1]}
                </h3>
                <span className="dur">{unit.meta}</span>
              </Unit>
            ))}
          </FlowLine>
          <Stream aria-hidden="true" />
          <StreamNote>
            <span className="lbl">Prior operators — {priorOperators}</span>
            <span className="lbl">Unit reversal: none</span>
          </StreamNote>
        </div>
      </Section>

      <Section>
        <SecHead>
          <h2>Notes</h2>
          <span className="tag">REF. 01</span>
        </SecHead>
        <Notes>
          <div>
            {notes.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
          <Readout>
            {readout.map((row) => (
              <div className="r-row" key={row.label}>
                <span className="lbl">{row.label}</span>
                <span className="r-val">{row.value}</span>
              </div>
            ))}
          </Readout>
        </Notes>
      </Section>

      <Section>
        <SecHead>
          <h2>Stream Table</h2>
          <span className="tag">{streams.length} STREAMS</span>
        </SecHead>
        <TableWrap>
          <table>
            <thead>
              <tr>
                <th scope="col">Tag</th>
                <th scope="col">Stream</th>
                <th scope="col">Service</th>
                <th scope="col">Stack</th>
                <th scope="col">Yr</th>
              </tr>
            </thead>
            <tbody>
              {streams.map((s) => (
                <tr key={s.tag}>
                  <td>
                    <span className="cell s-tag">{s.tag}</span>
                  </td>
                  <td>
                    <span className="cell s-name">
                      {s.url ? (
                        <a
                          className="rowlink"
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {leadWords(s.name)}
                          {/* last word and arrow travel together so the
                              marker can never orphan onto its own line */}
                          <span className="tail">{lastWord(s.name)}</span>
                        </a>
                      ) : (
                        <span className="internal">{s.name}</span>
                      )}
                    </span>
                  </td>
                  <td>
                    <span className="cell s-desc">
                      {s.hi && <span className="hi">{s.hi} </span>}
                      {s.desc}
                    </span>
                  </td>
                  <td>
                    <span className="cell s-stack">{s.stack}</span>
                  </td>
                  <td>
                    <span className="cell s-year">{s.year}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
        <span className="lbl">
          S-01 and S-02 are internal systems at StraitsX — no public link.
        </span>
      </Section>

      <Section>
        <SecHead>
          <h2>In Operation</h2>
          <span className="tag">SELF-HOSTED</span>
        </SecHead>
        <Ops>
          {operations.map((op) => (
            <a
              className="op"
              key={op.tag}
              href={op.url}
              target="_blank"
              rel="noreferrer"
            >
              <span className="op-tag">
                {op.tag} <span className="dot" aria-hidden="true" /> ONLINE
              </span>
              <span className="op-host">{op.host}</span>
              <span className="op-desc">{op.desc}</span>
              <span className="op-stack">{op.stack}</span>
            </a>
          ))}
        </Ops>
        <OpsNote className="lbl">{opsNote}</OpsNote>
      </Section>

      <Section>
        <SecHead>
          <h2>Connections</h2>
          <span className="tag">{connections.length} PORTS</span>
        </SecHead>
        <Conn>
          {connections.map((c) => (
            <a key={c.label} href={c.url} target="_blank" rel="noreferrer">
              <span className="lbl">{c.label}</span>
              <span className="c-handle">{c.handle}</span>
            </a>
          ))}
        </Conn>
      </Section>

      <Rev>
        <span className="lbl">Rev 2026 · {footerText}</span>
        <a
          className="lbl"
          href="https://github.com/bhaskoro-muthohar/bio"
          target="_blank"
          rel="noreferrer"
        >
          Sheet source on GitHub
        </a>
      </Rev>
    </Sheet>
  );
}

/* ---------------------------------------------------------------- layout */

const Sheet = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
  padding: var(--gut);
  display: flex;
  flex-direction: column;
  gap: clamp(2.6rem, 1.4rem + 4vw, 5rem);

  .lbl {
    font-family: var(--f-mono);
    font-size: var(--step--1);
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-dim);
  }
`;

/* ------------------------------------------------------------ title block */

const TitleBlock = styled.header`
  border: 1px solid var(--rule);
  background: var(--surface);
`;

const TbHead = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
  border-bottom: 1px solid var(--rule);

  @media screen and (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

const TbName = styled.div`
  padding: clamp(1rem, 0.5rem + 1.8vw, 2.1rem) clamp(1rem, 0.6rem + 1.6vw, 2rem)
    clamp(0.7rem, 0.4rem + 1vw, 1.2rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;

  h1 {
    font-family: var(--f-display);
    font-weight: 700;
    font-size: var(--step-3);
    line-height: 0.86;
    letter-spacing: 0.005em;
    text-transform: uppercase;
    text-wrap: balance;
  }

  .role {
    margin-top: clamp(0.7rem, 0.5rem + 0.6vw, 1.1rem);
    font-size: var(--step-1);
  }
`;

const TbStamp = styled.figure`
  border-left: 1px solid var(--rule);
  display: flex;
  flex-direction: column;
  width: clamp(122px, 9vw + 60px, 188px);

  img {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    filter: grayscale(1) contrast(1.06);
    border-bottom: 1px solid var(--rule);
  }

  figcaption {
    padding: 0.55rem 0.7rem 0.6rem;
    text-align: center;
    font-size: var(--step--1);
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-dim);
  }

  @media screen and (max-width: 560px) {
    flex-direction: row;
    align-items: center;
    gap: 0.85rem;
    width: 100%;
    border-left: 0;
    border-top: 1px solid var(--rule);
    padding: 0.7rem clamp(1rem, 0.6rem + 1.6vw, 2rem);

    img {
      width: 54px;
      border-bottom: 0;
      border: 1px solid var(--rule);
    }
    figcaption {
      padding: 0;
      text-align: left;
    }
  }
`;

const TbMeta = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  > dl,
  > .display-cell {
    padding: 0.75rem clamp(0.7rem, 0.5rem + 0.8vw, 1.2rem) 0.85rem;
    border-right: 1px solid var(--rule-soft);
    display: flex;
    flex-direction: column;
    gap: 0.28rem;
    min-width: 0;
  }
  > *:last-child {
    border-right: 0;
  }

  dt,
  .field-label {
    font-size: var(--step--1);
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-dim);
  }

  dd {
    font-size: var(--step-0);
    font-weight: 500;
    overflow-wrap: anywhere;
  }

  /* Instrument-style selector: three discrete positions, current one lit. */
  .seg {
    display: flex;
    margin-top: 0.1rem;
  }

  .seg button {
    font-family: var(--f-mono);
    font-size: var(--step--1);
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-dim);
    background: transparent;
    border: 1px solid var(--rule);
    padding: 0.3rem 0.42rem;
    margin-left: -1px;
    cursor: pointer;
    transition: color 120ms ease, background-color 120ms ease,
      border-color 120ms ease;
    min-height: 30px;
    flex: 1;
  }
  .seg button:first-child {
    margin-left: 0;
  }
  .seg button:hover {
    color: var(--ink);
  }
  .seg button.on {
    color: var(--signal);
    background: var(--signal-bg);
    border-color: var(--signal);
    position: relative;
    z-index: 1;
  }

  @media screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    > * {
      border-bottom: 1px solid var(--rule-soft);
    }
    > *:nth-child(2n) {
      border-right: 0;
    }
    > *:last-child {
      border-bottom: 0;
      grid-column: 1 / -1;
    }
  }
`;

/* ---------------------------------------------------------------- section */

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const SecHead = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.9rem;
  border-bottom: 1px solid var(--rule);
  padding-bottom: 0.55rem;

  h2 {
    font-family: var(--f-display);
    font-weight: 600;
    font-size: var(--step-2);
    letter-spacing: 0.05em;
    text-transform: uppercase;
    line-height: 1;
  }

  .tag {
    font-size: var(--step--1);
    font-weight: 600;
    letter-spacing: 0.16em;
    color: var(--flow);
    margin-left: auto;
    white-space: nowrap;
  }
`;

/* ------------------------------------------------------------ process line */

const FlowLine = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  align-items: stretch;

  @media screen and (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Unit = styled.div`
  position: relative;
  padding: 1.15rem 1rem 1.25rem;
  border: 1px solid var(--rule);
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  min-width: 0;

  & + & {
    border-left: 0;
  }

  & + &::before {
    content: "";
    position: absolute;
    left: -1px;
    top: 50%;
    width: 1px;
    height: 34px;
    transform: translateY(-50%);
    background: var(--flow);
    z-index: 1;
  }

  .tagno {
    font-size: var(--step--1);
    font-weight: 600;
    letter-spacing: 0.14em;
    color: var(--flow);
    text-transform: uppercase;
  }

  &.terminal .tagno {
    color: var(--ink-dim);
  }

  h3 {
    font-family: var(--f-display);
    font-weight: 600;
    font-size: var(--step-1);
    line-height: 1.1;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  .dur {
    font-size: var(--step--1);
    color: var(--ink-dim);
    margin-top: auto;
    padding-top: 0.5rem;
  }

  &.live {
    background: var(--signal-bg);
    outline: 1px solid var(--signal);
    outline-offset: -1px;
    z-index: 2;
  }
  &.live .tagno {
    color: var(--signal);
  }

  @media screen and (max-width: 860px) {
    & + & {
      border-left: 1px solid var(--rule);
      border-top: 0;
    }
    & + &::before {
      left: 50%;
      top: -1px;
      width: 34px;
      height: 1px;
      transform: translateX(-50%);
    }
    .dur {
      margin-top: 0;
    }
  }
`;

const Stream = styled.div`
  height: 3px;
  margin-top: -1px;
  background-image: repeating-linear-gradient(
    90deg,
    var(--flow) 0 10px,
    transparent 10px 22px
  );
  background-size: 22px 100%;
  animation: drift 1.4s linear infinite;

  @keyframes drift {
    to {
      background-position: 22px 0;
    }
  }

  @media screen and (max-width: 860px) {
    height: auto;
    width: 3px;
    min-height: 34px;
    margin: 0 auto;
    background-image: repeating-linear-gradient(
      180deg,
      var(--flow) 0 10px,
      transparent 10px 22px
    );
    background-size: 100% 22px;
    animation-name: drift-y;

    @keyframes drift-y {
      to {
        background-position: 0 22px;
      }
    }
  }
`;

const StreamNote = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.55rem;
`;

/* ------------------------------------------------------------------ notes */

const Notes = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  gap: clamp(1.4rem, 0.8rem + 2.4vw, 3.2rem);

  p {
    margin-bottom: 0.95rem;
    max-width: 62ch;
    font-size: var(--step-1);
    line-height: 1.75;
  }
  p:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Readout = styled.aside`
  border: 1px solid var(--rule);
  background: var(--surface);
  align-self: start;
  display: flex;
  flex-direction: column;

  .r-row {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    padding: 0.85rem 1rem 0.95rem;
    border-bottom: 1px solid var(--rule-soft);
  }
  .r-row:last-child {
    border-bottom: 0;
  }

  .r-val {
    font-size: var(--step-0);
    font-weight: 500;
    line-height: 1.5;
  }
`;

/* ----------------------------------------------------------- stream table */

const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid var(--rule);

  table {
    border-collapse: collapse;
    width: 100%;
    min-width: 760px;
  }

  thead th {
    text-align: left;
    padding: 0.7rem 1rem 0.75rem;
    background: var(--surface-2);
    border-bottom: 1px solid var(--rule);
    font-size: var(--step--1);
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-dim);
    white-space: nowrap;
  }

  tbody tr {
    border-bottom: 1px solid var(--rule-soft);
    transition: background-color 120ms ease;
  }
  tbody tr:last-child {
    border-bottom: 0;
  }
  tbody tr:hover,
  tbody tr:focus-within {
    background: var(--signal-bg);
  }

  tbody td {
    padding: 0;
    vertical-align: top;
  }

  .cell {
    padding: 0.95rem 1rem;
    display: block;
  }

  .s-tag {
    font-size: var(--step--1);
    font-weight: 600;
    letter-spacing: 0.12em;
    color: var(--flow);
    white-space: nowrap;
    transition: color 120ms ease;
  }
  tbody tr:hover .s-tag,
  tbody tr:focus-within .s-tag {
    color: var(--signal);
  }

  .s-name {
    font-family: var(--f-display);
    font-size: var(--step-1);
    font-weight: 600;
    letter-spacing: 0.035em;
    text-transform: uppercase;
  }

  /* Links must read as links without hover — touch devices never hover. */
  .rowlink {
    text-decoration: underline;
    text-decoration-color: var(--flow);
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
    display: inline-block;
    padding: 0.55rem 0;
    margin: -0.55rem 0;
  }
  tbody tr:hover .rowlink,
  tbody tr:focus-within .rowlink {
    text-decoration-color: var(--signal);
  }

  .tail {
    white-space: nowrap;
  }

  .tail::after {
    content: "\\2197";
    display: inline-block;
    margin-left: 0.45em;
    opacity: 0.8;
    color: var(--flow);
    transition: opacity 140ms ease, transform 140ms ease, color 140ms ease;
  }
  tbody tr:hover .tail::after,
  tbody tr:focus-within .tail::after {
    opacity: 1;
    color: var(--signal);
    transform: translate(2px, -2px);
  }

  /* Internal systems carry no link; the dashed rule says so without a tooltip. */
  .internal {
    border-bottom: 1px dashed var(--rule);
    padding-bottom: 2px;
  }

  .s-desc {
    color: var(--ink-dim);
    line-height: 1.55;
  }
  .s-desc .hi {
    color: var(--signal);
    font-weight: 600;
  }
  .s-stack {
    color: var(--ink-dim);
    font-size: var(--step--1);
    white-space: nowrap;
  }
  .s-year {
    font-weight: 500;
    white-space: nowrap;
  }
`;

/* ----------------------------------------------------------- in operation */

const Ops = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(268px, 1fr));
  border: 1px solid var(--rule);

  .op {
    padding: 1.05rem clamp(0.85rem, 0.6rem + 0.8vw, 1.3rem) 1.2rem;
    border-right: 1px solid var(--rule-soft);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    background: var(--surface);
    transition: background-color 120ms ease;
    min-width: 0;
  }
  .op:last-child {
    border-right: 0;
  }
  .op:hover,
  .op:focus-visible {
    background: var(--signal-bg);
  }

  .op-tag {
    font-size: var(--step--1);
    font-weight: 600;
    letter-spacing: 0.14em;
    color: var(--flow);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--flow);
    box-shadow: 0 0 0 3px var(--signal-bg);
    flex: none;
  }

  .op-host {
    font-family: var(--f-display);
    font-size: var(--step-1);
    font-weight: 600;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    overflow-wrap: anywhere;
    text-decoration: underline;
    text-decoration-color: var(--flow);
    text-decoration-thickness: 1px;
    text-underline-offset: 4px;
  }
  .op:hover .op-host,
  .op:focus-visible .op-host {
    text-decoration-color: var(--signal);
  }

  .op-desc {
    color: var(--ink-dim);
    line-height: 1.55;
  }
  .op-stack {
    font-size: var(--step--1);
    color: var(--ink-dim);
    margin-top: auto;
    padding-top: 0.35rem;
  }

  @media screen and (max-width: 560px) {
    .op {
      border-right: 0;
      border-bottom: 1px solid var(--rule-soft);
    }
    .op:last-child {
      border-bottom: 0;
    }
  }
`;

const OpsNote = styled.p`
  max-width: 76ch;
  letter-spacing: 0.06em;
  line-height: 1.75;
`;

/* ------------------------------------------------------------ connections */

const Conn = styled.nav`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  border: 1px solid var(--rule);
  background: var(--surface);

  a {
    padding: 1rem clamp(0.8rem, 0.6rem + 0.7vw, 1.2rem) 1.1rem;
    border-right: 1px solid var(--rule-soft);
    text-decoration: none;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    transition: background-color 120ms ease;
    min-width: 0;
  }
  a:last-child {
    border-right: 0;
  }
  a:hover,
  a:focus-visible {
    background: var(--signal-bg);
  }

  .c-handle {
    font-size: var(--step-0);
    font-weight: 500;
    overflow-wrap: anywhere;
    transition: color 120ms ease;
  }
  a:hover .c-handle {
    color: var(--signal);
  }
`;

const Rev = styled.footer`
  border-top: 1px solid var(--rule);
  padding-top: 0.9rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;

  a {
    text-decoration: underline;
    text-decoration-color: var(--flow);
    text-underline-offset: 4px;
    transition: color 120ms ease;
  }
  a:hover {
    color: var(--signal);
  }
`;
