import "./BreadCrumbs.css";
import React from "react";
import { Link } from "react-router-dom";
import type { FC } from "react";
import { ROUTES } from "../../Routes";
import './BreadCrumbs.css';

interface ICrumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  crumbs: ICrumb[];
}

export const BreadCrumbs: FC<BreadCrumbsProps> = (props) => {
  const { crumbs } = props;

  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs-list">
        <li className="breadcrumbs-item">
          <Link to={ROUTES.HOME} className="breadcrumbs-link">Главная</Link>
        </li>
        {!!crumbs.length &&
          crumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <li className="breadcrumbs-separator">/</li>
              {index === crumbs.length - 1 ? (
                <li className="breadcrumbs-item breadcrumbs-current">
                  {crumb.label}
                </li>
              ) : (
                <li className="breadcrumbs-item">
                  <Link to={crumb.path || ""} className="breadcrumbs-link">
                    {crumb.label}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}
      </ul>
    </nav>
  );
};