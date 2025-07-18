// routes.tsx
import HomePage from '../Home/HomePage';
import TemplateCreator from '../TemplateEngine/TemplateCreator';

export const appRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/create-template", element: <TemplateCreator /> }
];