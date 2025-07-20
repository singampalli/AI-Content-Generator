// routes.tsx
import HomePage from '../Home/HomePage';
import TemplateCreator from '../TemplateEngine/TemplateCreator';
import TemplateGrid from '../TemplateEngine/TemplateGrid';

export const appRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/create-template", element: <TemplateGrid /> }
];