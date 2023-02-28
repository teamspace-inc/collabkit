import { SidebarComments, ToggleSidebarCommentsButton } from '@collabkit/react';

export function Layout() {
  return (
    <>
      <nav>
        {/* This button toggles the sidebar.
            Put it in a toolbar or header of the page. */}
        <ToggleSidebarCommentsButton />
      </nav>

      {/* Rest of your page */}

      {/* Renders the sidebar, when it's visible. */}
      <SidebarComments />
    </>
  );
}
