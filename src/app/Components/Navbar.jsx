import CardNav from "./CardNav";

const Navbar = () => {
  const items = [
    {
      label: "Home",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        { label: "Home", ariaLabel: "About Us", href: "/" },
        { label: "Our Service", ariaLabel: "Careers", href: "/#services" },
        { label: "Testimonials", ariaLabel: "Testimonials", href: "/#Testimonials" },
      ],
    },
    {
      label: "About Us",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "About SSE", ariaLabel: "About Sai Saranya Enterprises", href: "/About" },
        { label: "Our Commitment", ariaLabel: "How we Work", href: "/About#commitment" },
        { label: "FAQ", ariaLabel: "Frequently Asked Questions ", href: "/About#faq" },
      ],
    },
    {
      label: "Products",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Bricks",
          ariaLabel: "Products",
          href: "/Products",
        },
        {
          label: "Blocks",
          ariaLabel: "Product",
          href: "/Products",
        },
        {
          label: "Sand",
          ariaLabel: "Product",
          href: "/Products",
        },
      ],
    },
  ];

  return (
    <CardNav
      logo="/logo.png"
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#111"
      buttonTextColor="#fff"
      ease="power3.out"
    />
  );
};

export default Navbar;
