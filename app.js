function onClick() {
    const links = document.querySelectorAll("nav li a");

    for (let link of links) {

        link.addEventListener("click", function(event) {
            event.preventDefault();

            //hide all sections
            for(let link of links) {
                const section = document.querySelector(
                    `.${link.getAttribute("href").substring(1)}`
                );
                
                section.style.display = "none";
                link.classList.remove("active");
            }

            //show the section that was clicked
            const section = document.querySelector(
                `.${this.getAttribute("href").substring(1)}`
            );

            section.style.display = "flex"
            link.classList.add("active");
        });
    }
}

onClick();