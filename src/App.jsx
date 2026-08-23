import { BrowserRouter, Routes, Route } from "react-router";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import MembershipForm from "./pages/MembershipForm";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Developments from "./pages/Developments";
import DevelopmentDetail from "./pages/DevelopmentDetail";
import Directory from "./pages/Directory";
import Gallery from "./pages/Gallery";
import GalleryAlbum from "./pages/GalleryAlbum";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="join" element={<MembershipForm />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:id" element={<EventDetail />} />
          <Route path="developments" element={<Developments />} />
          <Route path="developments/:id" element={<DevelopmentDetail />} />
          <Route path="directory" element={<Directory />} />
          {/* <Route path="gallery" element={<Gallery />} />
          <Route path="gallery/:id" element={<GalleryAlbum />} /> */}
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
