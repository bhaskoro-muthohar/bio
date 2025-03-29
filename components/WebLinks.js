// Weblinks Page Sections
// created by @realvjy
// date: 29 Jul, 2022

import Image from "next/image";
import styled from "styled-components";
import { Button, ButtonLink, Container, StyledLink } from "./ReusableStyles";
import Link from "next/link";
import {
  ChevronRightIcon,
  HexIcon,
  HomeIcon,
  TwitterIcon,
  NewUp,
  OvalIcon,
} from "./icons";
import allLinks from "../data/LinksData";
import bioData from "../data/BioData";

const Links = () => {
  // all user info from bioData
  const name = bioData[0].name;
  const url = bioData[0].url;
  const username = bioData[0].username;
  const titleImg = bioData[0].titleImg;
  const avatarImg = bioData[0].avatar;
  const description = bioData[0].description;
  const descShow = bioData[0].descShow;
  const subdesc = bioData[0].subdesc;
  const subdescShow = bioData[0].subdescShow;
  const footerText = bioData[0].footerText;
  const author = bioData[0].author;
  const authorURL = bioData[0].authorURL;
  const titleImage = "/title.svg";

  // Check what class to use oval or hex for avatar
  const avatarShape = bioData[0].nftAvatar ? `nft-clipped` : `oval-clipped`;

  // Description and subdescription goes here
  const descriptionText = descShow
    ? description
    : `Write your own fall back text if description not in BioData.js or remove me/leave blank`;
  const subdescText = subdescShow
    ? subdesc
    : `Write your own if you want or just remove me/leave blank`;

  const newProduct = bioData[0].newProduct; // checking for newProduct flag true false
  const newProductUrl = bioData[0].newProductUrl; // get product url if available

  // Collect all links filter by type - social, project, nft and other etc
  // get data for social section
  const social = allLinks.filter((el) => {
    return el.type === "social" && el.on;
  });

  // Get data for install section
  const install = allLinks.filter((el) => {
    return el.type === "install" && el.on;
  });

  // Get data for nfts
  const nfts = allLinks.filter((el) => {
    return el.type === "nft" && el.on;
  });

  // Get data for all project types and group by category
  const projectCategories = allLinks.filter(el => {
    return ["ML Engineering", "Data Analytics", "Web Applications"].includes(el.type) && el.on;
  }).reduce((acc, project) => {
    if (!acc[project.type]) {
      acc[project.type] = [];
    }
    acc[project.type].push(project);
    return acc;
  }, {});
  
  // Get individual project arrays for backward compatibility
  const mlEngProjects = projectCategories["ML Engineering"] || [];
  const dataEngProjects = projectCategories["Data Analytics"] || [];
  const webAppProjects = projectCategories["Web Applications"] || [];

  // Get data for Articles section
  const articles = allLinks.filter((el) => {
    return el.type === "Articles" && el.on;
  });

  // Get data for other section
  const others = allLinks.filter((el) => {
    return el.type === "other" && el.on;
  });

  return (
    <LinkWrapper>
      <LinkContainer>
        <TopPart>
          <LinkHeader>
            <Avatar>
              <AvatarWrap>
                {/* Avatar svg  hex or oval if nftAvatar=true will convert to hex */}
                <HexIcon />
                <OvalIcon />
                <div className={`${avatarShape} avatar-border`}></div>
                <div className={`${avatarShape} avatar-fill`}></div>
                <img src={avatarImg} className={avatarShape} alt="Profile Avatar" />
              </AvatarWrap>
            </Avatar>
            <Title>
              {/* Using titleimg flag to use image as title or text */}
              {titleImg ? (
                <img src={titleImage} className="handle" alt={name} />
              ) : (
                <h1>{name}</h1>
              )}
              {/* if your remove username from data it will not appear */}
              {username ? (
                <h3>
                  <a href={`${url}`}>{username}</a>
                </h3>
              ) : (
                ""
              )}
            </Title>
          </LinkHeader>

          {/* Bio Section */}
          <LinkBio>
            {description && <h1>{descriptionText}</h1>}
            {subdesc && <h4>{subdescText}</h4>}
          </LinkBio>
          {/* End Bio Section */}

          {/* Weblinks started */}
          <WebLinkWrap>
            {/* Social Icons */}
            <LinkSection className="social">
              <h3>Connect</h3>
              <div className="iconsonly">
                {social.map((i) => {
                  return (
                    <a
                      href={i.url}
                      key={i.title}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={i.title}
                    >
                      <LinkBox className="socialIcon" title={i.title}>
                        <img src={i.icon} style={{ filter: "var(--img)" }} alt={i.title} />
                      </LinkBox>
                    </a>
                  );
                })}
              </div>
            </LinkSection>
            {/* End Social Icons */}

            {/* Projects Sections */}
            <div className="projects-container">
              {Object.entries(projectCategories).map(([category, projects]) => (
                projects.length > 0 && (
                  <LinkSection key={category}>
                    <h3>{category}</h3>
                    {projects.map((project) => (
                      <a
                        href={project.url}
                        key={project.title}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <LinkBox>
                          <LinkTitle>
                            <div style={{ display: "flex", alignItems: "center" }}>
                              <img src={project.icon} alt={project.title} /> {project.title}
                            </div>
                            {project.subdesc && (
                              <div className="subdesc">{project.subdesc}</div>
                            )}
                          </LinkTitle>
                          <NewUp />
                        </LinkBox>
                      </a>
                    ))}
                  </LinkSection>
                )
              ))}
            </div>
            {/* End Projects Sections */}

            {/* Articles Section */}
            {articles.length > 0 && (
              <LinkSection>
                <h3>Articles</h3>
                {articles.map((i) => (
                  <a
                    href={i.url}
                    key={i.title}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkBox>
                      <LinkTitle>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src={i.icon} alt={i.title} /> {i.title}
                        </div>
                        {i.subdesc && (
                          <div className="subdesc">{i.subdesc}</div>
                        )}
                      </LinkTitle>
                      <NewUp />
                    </LinkBox>
                  </a>
                ))}
              </LinkSection>
            )}
            {/* End Articles Section */}

            {/* Other Section */}
            {others.length > 0 && (
              <LinkSection>
                <h3>{others[0].type}</h3>
                {others.map((i) => (
                  <a
                    href={i.url}
                    key={i.title}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LinkBox>
                      <LinkTitle>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img src={i.icon} alt={i.title} /> {i.title}
                        </div>
                        {i.subdesc && (
                          <div className="subdesc">{i.subdesc}</div>
                        )}
                      </LinkTitle>
                      <NewUp />
                    </LinkBox>
                  </a>
                ))}
              </LinkSection>
            )}
            {/* End Other Section */}
          </WebLinkWrap>
          {/* End Weblinks */}
        </TopPart>
        <BottomPart>
          <LinkFoot>
            {footerText && (
              <h4>
                {footerText} {author && <a href={authorURL}>{author}</a>}
              </h4>
            )}
          </LinkFoot>
        </BottomPart>
      </LinkContainer>
    </LinkWrapper>
  );
};

export default Links;

const LinkWrapper = styled(Container)``;

const LinkContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  padding: 24px;
  max-width: 700px;
  margin: 0 auto;
  width: 100%;
  
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    padding: 16px;
  }
`;

const LinkHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 12px;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    margin-top: 20px;
  }
`;

const Avatar = styled.div`
  height: 90px;
  width: 90px;
  position: relative;
  margin-bottom: 12px;
`;

const AvatarWrap = styled.div`
  height: 100%;
  width: 100%;
  filter: drop-shadow(0px 1px 2px var(--avatar-shadow));
  img {
    height: calc(100% - 6px);
    width: calc(100% - 6px);
  }
  .avatar-border {
    height: 100%;
    width: 100%;
    position: absolute;
    background: ${({ theme }) => theme.bg.primary};
  }
  .avatar-fill {
    height: calc(100% - 6px);
    width: calc(100% - 6px);
    position: absolute;
    background: ${({ theme }) => theme.bg.primary};
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 38px;
    font-weight: 700;

    letter-spacing: -2px;
    background: linear-gradient(
      90deg,
      #4ab1f1 5.71%,
      #566cec 33.77%,
      #d749af 61.82%,
      #ff7c51 91.21%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 32px;
    }
  }
  h3 {
    margin-top: 6px;
    font-size: 18px;
    font-weight: 500;
    letter-spacing: -0.7px;
    color: ${({ theme }) => theme.text.secondary};
    opacity: 0.5;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 15px;
      margin-top: 2px;
    }
  }

  .name {
    margin-top: 8px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      width: 140px;
    }
  }
  .handle {
    height: 32px;
    margin-top: 6px;
    margin-bottom: 6px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      height: 26px;
    }
  }
`;

const LinkBio = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 620px;
  margin: 0 auto 20px auto;
  width: 100%;
  
  h1 {
    font-size: 20px;
    line-height: 1.6;
    font-weight: 500;
    letter-spacing: -0.2px;
    padding: 0;
    color: ${({ theme }) => theme.text.primary};
    margin-bottom: 16px;

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 17px;
      line-height: 1.5;
    }
  }

  h4 {
    font-size: 16px;
    letter-spacing: 0;
    margin: 8px 0;
    color: ${({ theme }) => theme.text.secondary};
    font-weight: 400;
    line-height: 1.8;
    opacity: 0.8;
    white-space: pre-line;
    text-align: center;

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 14px;
      line-height: 1.6;
    }

    a {
      font-weight: 600;
      opacity: 0.8;
      transition: opacity 0.2s ease;
      &:hover {
        opacity: 1;
      }
    }
  }
`;
const TopPart = styled.div``;

const BottomPart = styled.div`
  margin-bottom: 40px;
`;
const LinkFoot = styled.div`
  h4 {
    color: ${({ theme }) => theme.text.secondary};
    line-height: 32px;
    letter-spacing: -0.2px;
    font-size: 16px;
    font-weight: 500;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 12px;
    }
    span {
      font-size: 10px;
      vertical-align: bottom;
      line-height: 32px;
      margin: 0 2px;
      opacity: 0.6;
      @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
        font-size: 8px;
      }
    }
  }
`;

const WebLinkWrap = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  
  .projects-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    padding: 0;
    max-width: 100%;
  }
`;

const LinkSection = styled.div`
  padding: 12px 0;
  display: flex;
  margin: 0 auto;
  max-width: 450px;
  flex-direction: column;
  &.social {
    max-width: max-content;
    padding: 14px 0;
    margin-bottom: 24px;
  }
  .iconsonly {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    gap: 8px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      flex-wrap: wrap;
      gap: 12px;
    }
  }
  h3 {
    font-size: 13px;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 8px;
    color: ${({ theme }) => theme.text.secondary};
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 12px;
    }
  }
`;

const LinkBox = styled.div`
  padding: 18px 20px;
  border-radius: 12px;
  margin: 8px 0;
  border: 1px solid ${({ theme }) => theme.bg.secondary};
  flex-direction: row;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.5px;
  position: relative;
  text-align: center;
  width: 100%;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  &::before {
    content: "";
    border-radius: 12px;
    display: block;
    position: absolute;
    z-index: -1;
    inset: -2px;
    opacity: 0;
    transform: scale(0.8);
  }
  &:hover {
    transition: all 333ms ease 0s;
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    &::before {
      opacity: 1;
      background: ${({ theme }) => theme.bg.hover};
      transition: all 333ms ease 0s;
      transform: scale(1);
    }
  }
  .new-up {
    transform: scale(0.8);
    opacity: 0.7;
  }

  &.socialIcon {
    padding: 14px;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.bg.secondary};
    margin: 0;
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, background-color 0.2s ease;
    
    &:hover {
      transform: translateY(-3px);
      background-color: ${({ theme }) => theme.bg.tertiary};
    }
    
    img {
      height: 22px;
      width: 22px;
    }

    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      padding: 12px;
      img {
        height: 18px;
        width: 18px;
      }
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    padding: 16px;
    margin: 6px 0;
    font-size: 15px;
  }
`;

const LinkTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 18px;
  @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
    font-size: 15px;
  }
  img {
    height: 20px;
    margin-right: 10px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      height: 18px;
      margin-right: 8px;
    }
  }
  .subdesc {
    font-size: 14px;
    color: ${({ theme }) => theme.text.secondary};
    font-weight: normal;
    margin-top: 4px;
    @media screen and (max-width: ${({ theme }) => theme.deviceSize.tablet}) {
      font-size: 13px;
      line-height: 1.4;
    }
  }
`;

const NewSection = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  img {
    width: 100%;
    border: 1px solid ${({ theme }) => theme.bg.secondary};
    border-radius: 12px;
    cursor: pointer;
    &:hover {
      transform: scale(1.01);
    }
  }
`;