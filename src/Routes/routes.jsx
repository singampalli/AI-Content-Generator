import { PromptInterface } from '../Chat/PromptInterface';
import HomePage from '../Home/HomePage';
import TemplateGrid from '../TemplateEngine/TemplateGrid';

export const appRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "/create-template", element: <TemplateGrid /> },
  { path: "/AIChat", element: <PromptInterface /> }
];