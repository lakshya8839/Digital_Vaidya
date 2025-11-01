# Design Guidelines: 3D Body Model Spot Labeling System

## Design Approach
**System-Based Approach**: Material Design principles adapted for medical/technical precision
**Justification**: This utility-focused medical tool requires clarity, accuracy, and professional reliability over visual flair. The interface must prioritize functional efficiency and precise interaction.

## Layout Architecture

### Primary Layout Structure
**Split-View Design**:
- Left Panel (60-65% width): 3D model viewport with full interaction canvas
- Right Sidebar (35-40% width): Control panel with spot list, labeling tools, and export functions
- Top Navigation Bar: Logo, project name, save/load controls, settings
- Bottom Status Bar: Coordinate display, zoom level, model statistics

### Spacing System
**Tailwind Units**: Consistently use 2, 4, 6, 8, and 12 for spacing
- Component padding: p-4 to p-6
- Section margins: my-6 to my-8
- Card spacing: gap-4 within grids
- Tight spacing for data displays: gap-2

## Typography Hierarchy

### Font Selection
**Primary Font**: Inter or Roboto (Google Fonts) - excellent for technical interfaces
**Monospace Font**: JetBrains Mono or Roboto Mono - for coordinate displays and JSON output

### Type Scale
- **Main Heading** (Project Title): text-2xl font-semibold
- **Section Headers**: text-lg font-medium
- **Subsection Labels**: text-sm font-medium uppercase tracking-wide
- **Body Text**: text-base font-normal
- **Data/Coordinates**: text-sm font-mono
- **Secondary Info**: text-xs
- **Button Text**: text-sm font-medium

## Component Library

### 3D Viewport Controls
**Floating Control Panel** (bottom-left of viewport):
- Reset View button
- Zoom controls (+/- buttons)
- Rotation lock toggle
- Grid overlay toggle
- Positioned with absolute positioning, p-4 from edges
- Backdrop blur effect (backdrop-blur-md)

**Marker Visualization**:
- Spherical pins rendered on 3D model surface
- Label tooltip on hover (backdrop-blur-md, p-2, rounded-md)
- Connection line from marker to label when selected
- Size: proportional to zoom level, minimum 8px diameter

### Right Sidebar Structure

**Spot List Panel** (scrollable):
- Card-based list items (rounded-lg border p-4 mb-3)
- Each card displays: spot number, label type, body region, coordinates
- Edit/Delete action buttons (icon buttons, size 8x8)
- Selected state: thicker border, subtle emphasis
- Empty state: centered illustration with "No spots marked yet" message

**Labeling Controls**:
- Category selector: Button group or segmented control
- Custom label input field with autocomplete
- Color picker for marker customization
- Body region dropdown (auto-detected but editable)
- Add Notes textarea (rows-3)

**Data Export Panel**:
- JSON preview section with syntax highlighting
- Copy to Clipboard button (icon + text)
- Download JSON button (primary action)
- Export format options (checkboxes)

### Navigation Bar
- Left: Logo/icon (h-8) + "Body Spot Analyzer" title (text-xl font-semibold)
- Center: Current project name (editable on click)
- Right: Save (secondary button), Export (primary button), Settings (icon button)
- Height: h-16, px-6

### Forms & Inputs

**Text Inputs**:
- Standard height: h-10
- Padding: px-3 py-2
- Border radius: rounded-md
- Focus: ring-2 treatment

**Buttons**:
- Primary: px-4 py-2 rounded-md font-medium
- Secondary: px-4 py-2 rounded-md border
- Icon-only: p-2 rounded-md (for toolbar actions)
- Large (CTA): px-6 py-3

**Dropdown Selects**:
- Match text input styling
- Custom arrow icon (Heroicons chevron-down)

### Data Display Components

**Coordinate Display Box**:
- Monospace font
- Three rows: X, Y, Z coordinates
- Grid layout with labels
- Padding: p-3
- Border treatment

**Statistics Cards**:
- Total spots count
- Labels breakdown
- Last modified timestamp
- Grid: grid-cols-3 gap-4

### Modal Dialogs
**Settings Modal**:
- Centered overlay (max-w-2xl)
- Tabbed interface for different setting categories
- Model quality settings
- Marker appearance customization
- Export preferences

**Confirmation Dialogs**:
- Smaller size (max-w-md)
- Clear action buttons (Cancel left, Confirm right)
- Icon indication (warning/info)

## Interaction Patterns

### 3D Model Interactions
- Click to place marker: cursor changes to crosshair
- Drag to rotate: smooth momentum-based rotation
- Scroll to zoom: smooth transitions
- Right-click context menu: quick actions for nearby markers

### Marker Management
- Click marker to select: shows detailed panel
- Double-click to edit label
- Drag marker to reposition (with confirmation)
- Hover shows tooltip with basic info (0.2s delay)

### Sidebar Interactions
- Scroll independently from viewport
- Collapsible sections with chevron indicators
- Sticky header for active spot details
- Keyboard navigation support (arrow keys through list)

## Responsive Behavior

**Desktop (lg+)**: Full split-view layout as described
**Tablet (md)**: 
- Sidebar becomes slide-out panel (toggleable)
- Viewport takes full width when sidebar hidden
- Floating toggle button for sidebar (fixed right edge)

**Mobile**: 
- Stack layout: viewport on top, controls below
- Viewport: 60vh minimum height
- Bottom sheet for spot list and controls
- Simplified marker interactions (tap-based)

## Accessibility Features

- All interactive elements: min-height h-10 (40px touch target)
- Keyboard shortcuts displayed in tooltips
- ARIA labels for 3D viewport regions
- High contrast mode toggle in settings
- Screen reader announcements for marker placement
- Focus indicators: ring-2 offset-2

## Animation Guidelines
**Minimal, Purposeful Motion**:
- Marker placement: scale-in animation (0.2s)
- Panel transitions: slide 0.3s ease-in-out
- Tooltip appearance: fade-in 0.15s
- Button feedback: subtle scale on active state
- NO continuous animations or distracting effects
- Model rotation: smooth but immediate response (no easing delay)

## Images
**No hero images required** - this is a functional application interface, not a marketing page. The 3D model viewport serves as the primary visual element.

**Icon Library**: Heroicons (outline style for toolbar, solid for status indicators)

## Professional Polish
- Consistent 2px border widths throughout
- Subtle shadows for elevated elements (shadow-sm to shadow-md)
- Backdrop blur for floating panels (backdrop-blur-md)
- Professional empty states with contextual help text
- Loading states with skeleton screens for data-heavy panels
- Error boundaries with helpful recovery actions