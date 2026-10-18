// Function to get URL parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the 'restaurant' parameter from the URL
const restaurantName = getQueryParam('restaurant');

// Reference to the content div
const menuContainer = document.getElementById('content');

const darkModeAnchor = document.getElementById('light-menu-a');
darkModeAnchor.href = `../menu.html?restaurant=${restaurantName}`;

// Generating seperate menu sections
const generateMenuSection = (menu) => {
    console.log(menu);
    let contentHTML = '';
    menu.forEach(main => {
        contentHTML += `
            <div class="col-md-6 mb30">
                <div class="post-menu">
                    <div class="img-round">
                        <img src=${main['dishImg'] || "images/menu/thumbs-small/main/1.jpg"} class="img-responsive" alt="">
                    </div>
                    <div class="sub-item-service meta">
                        <div class="c1">${main['dishName']}</div>
                        <div class="c2"></div>
                        <div class="c3">৳${main['dishPrice']}</div>
                    </div>
                    <div class="service-text meta-content">${main['dishDescription']}</div>
                </div>
            </div>
        `;
    });
    return contentHTML;
}

// Fetch the data from the JSON file
fetch('../data/menu.json')
    .then(response => response.json())
    .then(data => {
        if (data[restaurantName]) {
            const { name, menu } = data[restaurantName];

            let menuSections = '';

            menu.forEach((item, idx) => {
                const sectionMenu = item['section-menu'];
                console.log(sectionMenu);

                if (sectionMenu) {
                    menuSections += `
                        <section id="sub-menu-1" class="side-bg" data-bgcolor="#18181d">
                            <div class="col-md-3 ${idx%2===1?'col-md-offset-9 pull-right':''} image-container wow fadeInLeft">
                                <div class="background-image" style="background-image: url('${item['section-side-img']}')"></div>
                            </div>

                            <div class="container">
                                <div class="row">
                                    <div class="col-md-8 ${idx%2===1?'':'col-md-offset-4'}">
                                        <div class="text-center">
                                            <h2>${item['section-title']}<span class="teaser">Fresh and delicious</span><span class="small-border center"></span></h2>
                                        </div>

                                        <div class="row wow fadeInUp" id="menu-mains">
                                            ${generateMenuSection(sectionMenu)}
                                            <div class="clearfix"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    `;
                }
            });

            menuContainer.innerHTML = menuSections;
        } else {
            menuContainer.innerHTML = '<h2>Welcome</h2><p>Please select a valid section.</p>';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        menuContainer.innerHTML = '<h2>Error</h2><p>There was an error fetching the content.</p>';
    });
