/* ============================================================
   NUDGEIQ
   Customer Intelligence Dashboard
   Complete Navigation + Customer Data + Starfield
   + Persona Constellation
============================================================ */


/* ============================================================
   GLOBAL DATA
============================================================ */

let customerData = [];

let currentCustomer = null;

let spaceAnimationId = null;
let constellationAnimationId = null;


/* ============================================================
   PAGE CONFIGURATION
============================================================ */

const pages = {
    overview: "overviewPage",
    opportunity: "opportunityPage",
    customer: "customerPage",
    campaigns: "campaignsPage",
    monitoring: "monitoringPage",
    experiments: "experimentsPage"
};


/* ============================================================
   INITIALISE
============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    initialiseNavigation();

    initialiseCustomerSearch();

    loadCustomerData();

    initialiseSpace();

    initialiseConstellation();

});


/* ============================================================
   NAVIGATION
============================================================ */

function initialiseNavigation() {

    const buttons = document.querySelectorAll(".nav-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const pageName = button.getAttribute("data-page");

            if (!pageName) {
                console.warn("Navigation button has no data-page:", button);
                return;
            }

            showPage(pageName);

        });

    });

}


/* ============================================================
   SHOW PAGE
============================================================ */

function showPage(pageName) {

    const pageId = pages[pageName];

    if (!pageId) {

        console.error(
            "Unknown page:",
            pageName
        );

        return;
    }


    /* -----------------------------------------
       Hide every page
    ----------------------------------------- */

    Object.values(pages).forEach(id => {

        const page = document.getElementById(id);

        if (page) {
            page.classList.remove("active");
        }

    });


    /* -----------------------------------------
       Show selected page
    ----------------------------------------- */

    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.add("active");

    } else {

        console.error(
            "Page element not found:",
            pageId
        );

        return;
    }


    /* -----------------------------------------
       Update navigation state
    ----------------------------------------- */

    document.querySelectorAll(".nav-btn").forEach(button => {

        button.classList.remove("active");

        if (
            button.getAttribute("data-page") === pageName
        ) {

            button.classList.add("active");

        }

    });


    /* -----------------------------------------
       Refresh canvas pages
    ----------------------------------------- */

    if (pageName === "overview") {

        setTimeout(() => {

            initialiseConstellation();

        }, 50);

    }

}


/* ============================================================
   CUSTOMER DATA
============================================================ */

async function loadCustomerData() {

    try {

        const response =
            await fetch("customer_data.json");

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );

        }

        customerData =
            await response.json();


        console.log(
            "NudgeIQ customer data loaded:",
            customerData.length
        );


        /*
         * Display the first customer by default.
         */

        if (customerData.length > 0) {

            displayCustomer(
                customerData[0]
            );

        }


        /*
         * Update persona information
         * from actual JSON.
         */

        updatePersonaRanking();

    }

    catch (error) {

        console.error(
            "Could not load customer_data.json:",
            error
        );

        const message =
            document.getElementById(
                "searchMessage"
            );

        if (message) {

            message.textContent =
                "Customer data could not be loaded. Make sure customer_data.json is in the same folder as index.html.";

        }

    }

}


/* ============================================================
   CUSTOMER SEARCH
============================================================ */

function initialiseCustomerSearch() {

    const input =
        document.getElementById(
            "customerSearch"
        );

    const button =
        document.getElementById(
            "analyseCustomer"
        );


    if (!input || !button) {
        return;
    }


    button.addEventListener(
        "click",
        searchCustomer
    );


    input.addEventListener(
        "keydown",
        event => {

            if (event.key === "Enter") {

                searchCustomer();

            }

        }
    );

}


/* ============================================================
   SEARCH CUSTOMER
============================================================ */

function searchCustomer() {

    const input =
        document.getElementById(
            "customerSearch"
        );

    if (!input) {
        return;
    }


    const query =
        input.value
            .trim()
            .toLowerCase();


    if (!query) {

        setSearchMessage(
            "Please enter a Customer ID."
        );

        return;
    }


    if (!customerData.length) {

        setSearchMessage(
            "Customer data is still loading."
        );

        return;
    }


    const customer =
        customerData.find(item => {

            const id =
                String(
                    item.Customer_ID ||
                    item.customer_id ||
                    ""
                ).toLowerCase();

            return id === query;

        });


    if (!customer) {

        setSearchMessage(
            "Customer not found. Try an ID such as SYN00001."
        );

        return;
    }


    setSearchMessage("");

    displayCustomer(customer);

}


/* ============================================================
   SEARCH MESSAGE
============================================================ */

function setSearchMessage(message) {

    const element =
        document.getElementById(
            "searchMessage"
        );

    if (element) {

        element.textContent =
            message;

    }

}


/* ============================================================
   DISPLAY CUSTOMER
============================================================ */

function displayCustomer(customer) {

    currentCustomer = customer;


    /* -----------------------------------------
       Basic information
    ----------------------------------------- */

    setText(
        "customerId",
        getValue(
            customer,
            [
                "Customer_ID",
                "customer_id",
                "Customer ID"
            ],
            "—"
        )
    );


    setText(
        "customerPersona",
        getValue(
            customer,
            ["Persona"],
            "—"
        )
    );


    setText(
        "customerType",
        getValue(
            customer,
            ["Customer_Type"],
            "—"
        )
    );


    setText(
        "customerAge",
        getValue(
            customer,
            ["age", "Age"],
            "—"
        )
    );


    setText(
        "customerJob",
        getValue(
            customer,
            ["job", "Job"],
            "—"
        )
    );


    setText(
        "customerExperience",
        getValue(
            customer,
            ["Investment_Experience"],
            "—"
        )
    );


    setText(
        "customerRisk",
        getValue(
            customer,
            ["Risk_Appetite"],
            "—"
        )
    );


    /* -----------------------------------------
       Behavioural levels
    ----------------------------------------- */

    const financial =
        getLevelValue(
            customer,
            [
                "Financial_Level",
                "Financial Stability"
            ]
        );


    const engagement =
        getLevelValue(
            customer,
            [
                "Engagement_Level",
                "Engagement"
            ]
        );


    const profile =
        getLevelValue(
            customer,
            [
                "Profile_Level",
                "Investor_Profile_Level",
                "Investor Profile"
            ]
        );


    const awareness =
        getLevelValue(
            customer,
            [
                "Gold_Awareness",
                "Gold Awareness"
            ]
        );


    setText(
        "financialLevel",
        financial.label
    );


    setText(
        "engagementLevel",
        engagement.label
    );


    setText(
        "profileLevel",
        profile.label
    );


    setText(
        "goldAwareness",
        awareness.label
    );


    setBar(
        "financialBar",
        financial.value
    );


    setBar(
        "engagementBar",
        engagement.value
    );


    setBar(
        "profileBar",
        profile.value
    );


    setBar(
        "awarenessBar",
        awareness.value
    );


    /* -----------------------------------------
       Opportunity
    ----------------------------------------- */

    const opportunityScore =
        Number(
            getValue(
                customer,
                [
                    "Gold_Opportunity_Score",
                    "gold_opportunity_score"
                ],
                0
            )
        );


    const opportunityBand =
        getValue(
            customer,
            [
                "Gold_Opportunity_Band",
                "Opportunity_Band"
            ],
            "—"
        );


    setText(
        "opportunityScore",
        opportunityScore
            ? opportunityScore.toFixed(3)
            : "—"
    );


    setText(
        "opportunityBand",
        opportunityBand
    );


    /* -----------------------------------------
       Nudge decision
    ----------------------------------------- */

    setText(
        "nextBestAction",
        getValue(
            customer,
            [
                "Next_Best_Action",
                "Action"
            ],
            "—"
        )
    );


    setText(
        "recommendedChannel",
        getValue(
            customer,
            [
                "Recommended_Channel",
                "Channel"
            ],
            "—"
        )
    );


    setText(
        "nudgeIntensity",
        getValue(
            customer,
            [
                "Nudge_Intensity"
            ],
            "—"
        )
    );


    setText(
        "businessObjective",
        getValue(
            customer,
            [
                "Business_Objective"
            ],
            "—"
        )
    );


    setText(
        "targetKpi",
        getValue(
            customer,
            [
                "Target_KPI",
                "Target_Kpi"
            ],
            "—"
        )
    );


    setText(
        "goldNudgeMessage",
        getValue(
            customer,
            [
                "Gold_Nudge_Message",
                "Nudge_Message"
            ],
            "No nudge message available."
        )
    );

}


/* ============================================================
   SAFE VALUE READER
============================================================ */

function getValue(
    object,
    keys,
    fallback = "—"
) {

    for (const key of keys) {

        if (
            object &&
            object[key] !== undefined &&
            object[key] !== null &&
            object[key] !== ""
        ) {

            return object[key];

        }

    }

    return fallback;

}


/* ============================================================
   TEXT HELPER
============================================================ */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent =
            value;

    }

}


/* ============================================================
   LEVEL VALUE
============================================================ */

function getLevelValue(
    customer,
    keys
) {

    const raw =
        getValue(
            customer,
            keys,
            "Medium"
        );


    const text =
        String(raw)
            .trim();


    const lower =
        text.toLowerCase();


    if (
        lower.includes("high")
    ) {

        return {
            label: text,
            value: 88
        };

    }


    if (
        lower.includes("low")
    ) {

        return {
            label: text,
            value: 30
        };

    }


    if (
        lower.includes("medium")
    ) {

        return {
            label: text,
            value: 60
        };

    }


    const numeric =
        Number(raw);


    if (
        !Number.isNaN(numeric)
    ) {

        let value =
            numeric;


        if (value <= 1) {
            value *= 100;
        }


        if (value > 100) {
            value = 100;
        }


        if (value < 0) {
            value = 0;
        }


        return {

            label:
                `${Math.round(value)}%`,

            value:
                value

        };

    }


    return {

        label:
            text,

        value:
            60

    };

}


/* ============================================================
   PROGRESS BAR
============================================================ */

function setBar(
    id,
    value
) {

    const element =
        document.getElementById(id);

    if (!element) {
        return;
    }


    const safeValue =
        Math.max(
            0,
            Math.min(
                100,
                Number(value) || 0
            )
        );


    element.style.width =
        `${safeValue}%`;

}


/* ============================================================
   PERSONA RANKING
============================================================ */

function updatePersonaRanking() {

    if (!customerData.length) {
        return;
    }


    const groups = {};


    customerData.forEach(customer => {

        const persona =
            getValue(
                customer,
                ["Persona"],
                "Unknown"
            );


        const score =
            Number(
                getValue(
                    customer,
                    [
                        "Gold_Opportunity_Score"
                    ],
                    0
                )
            );


        if (!groups[persona]) {

            groups[persona] = {

                count: 0,
                score: 0

            };

        }


        groups[persona].count++;

        groups[persona].score +=
            Number.isFinite(score)
                ? score
                : 0;

    });


    const ranking =
        Object.entries(groups)
            .map(
                ([persona, data]) => ({

                    persona,

                    count:
                        data.count,

                    score:
                        data.count
                            ? data.score / data.count
                            : 0

                })
            )
            .sort(
                (a, b) =>
                    b.score - a.score
            );


    renderPersonaRanking(
        "personaRanking",
        ranking
    );


    renderPersonaRanking(
        "opportunityPersonaRanking",
        ranking.slice(0, 4)
    );

}


/* ============================================================
   RENDER PERSONA RANKING
============================================================ */

function renderPersonaRanking(
    containerId,
    ranking
) {

    const container =
        document.getElementById(
            containerId
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    ranking.forEach(
        (item, index) => {

            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "ranking-item";


            row.innerHTML = `

                <span class="ranking-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <span class="ranking-name">
                    ${escapeHTML(item.persona)}
                </span>

                <strong>
                    ${item.score.toFixed(3)}
                </strong>

            `;


            container.appendChild(row);

        }
    );

}


/* ============================================================
   HTML ESCAPE
============================================================ */

function escapeHTML(value) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* ============================================================
   COSMIC STARFIELD
============================================================ */

function initialiseSpace() {

    const canvas =
        document.getElementById(
            "spaceCanvas"
        );


    if (!canvas) {
        return;
    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {
        return;
    }


    const stars = [];


    function resize() {

        canvas.width =
            window.innerWidth;

        canvas.height =
            window.innerHeight;


        createStars();

    }


    function createStars() {

        stars.length = 0;


        const amount =
            Math.min(
                220,
                Math.max(
                    90,
                    Math.floor(
                        window.innerWidth *
                        window.innerHeight /
                        7000
                    )
                )
            );


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            stars.push({

                x:
                    Math.random() *
                    canvas.width,

                y:
                    Math.random() *
                    canvas.height,

                radius:
                    Math.random() *
                    1.3 +
                    0.2,

                opacity:
                    Math.random() *
                    0.75 +
                    0.2,

                speed:
                    Math.random() *
                    0.025 +
                    0.008,

                phase:
                    Math.random() *
                    Math.PI *
                    2

            });

        }

    }


    function draw() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );


        const now =
            Date.now() *
            0.001;


        stars.forEach(star => {

            const twinkle =
                0.55 +
                Math.sin(
                    now *
                    star.speed *
                    100 +
                    star.phase
                ) *
                0.45;


            const opacity =
                star.opacity *
                twinkle;


            ctx.beginPath();


            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(255,220,130,${opacity})`;


            ctx.fill();


            /*
             * Occasional tiny glow
             */

            if (star.radius > 1) {

                ctx.beginPath();

                ctx.arc(
                    star.x,
                    star.y,
                    star.radius * 3,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(255,210,110,${opacity * 0.08})`;

                ctx.fill();

            }

        });


        spaceAnimationId =
            requestAnimationFrame(
                draw
            );

    }


    window.addEventListener(
        "resize",
        resize
    );


    resize();


    if (spaceAnimationId) {

        cancelAnimationFrame(
            spaceAnimationId
        );

    }


    draw();

}


/* ============================================================
   PERSONA CONSTELLATION
============================================================ */

function initialiseConstellation() {

    const canvas =
        document.getElementById(
            "personaCanvas"
        );


    const wrapper =
        canvas?.parentElement;


    if (
        !canvas ||
        !wrapper
    ) {

        return;

    }


    const ctx =
        canvas.getContext("2d");


    if (!ctx) {
        return;
    }


    if (
        constellationAnimationId
    ) {

        cancelAnimationFrame(
            constellationAnimationId
        );

    }


    const personas = [

        {
            name:
                "Premium Investor",

            score:
                0.900
        },

        {
            name:
                "Growth Investor",

            score:
                0.815
        },

        {
            name:
                "Dormant Wealth Holder",

            score:
                0.699
        },

        {
            name:
                "Balanced Investor",

            score:
                0.642
        },

        {
            name:
                "General Investor",

            score:
                0.600
        },

        {
            name:
                "Potential Investor",

            score:
                0.457
        },

        {
            name:
                "Inactive Investor",

            score:
                0.381
        },

        {
            name:
                "Emerging Investor",

            score:
                0.361
        },

        {
            name:
                "Low Engagement User",

            score:
                0.269
        }

    ];


    function resize() {

        const rect =
            wrapper.getBoundingClientRect();


        const dpr =
            window.devicePixelRatio ||
            1;


        canvas.width =
            rect.width * dpr;


        canvas.height =
            rect.height * dpr;


        canvas.style.width =
            `${rect.width}px`;


        canvas.style.height =
            `${rect.height}px`;


        ctx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );


        draw();

    }


    function getPositions() {

        const width =
            wrapper.clientWidth;


        const height =
            wrapper.clientHeight;


        const cx =
            width / 2;


        const cy =
            height / 2;


        const rx =
            Math.min(
                width * 0.40,
                430
            );


        const ry =
            Math.min(
                height * 0.37,
                175
            );


        return personas.map(
            (persona, index) => {

                const angle =
                    -Math.PI / 2 +
                    (
                        index /
                        personas.length
                    ) *
                    Math.PI *
                    2;


                return {

                    ...persona,

                    x:
                        cx +
                        Math.cos(angle) *
                        rx,

                    y:
                        cy +
                        Math.sin(angle) *
                        ry,

                    radius:
                        4 +
                        persona.score * 5

                };

            }
        );

    }


    function drawConstellationStars(
        positions,
        time
    ) {

        positions.forEach(
            (node, index) => {

                const pulse =
                    0.72 +
                    Math.sin(
                        time * 0.002 +
                        index
                    ) *
                    0.28;


                const radius =
                    node.radius *
                    (
                        0.9 +
                        pulse * 0.25
                    );


                /*
                 * Glow
                 */

                const gradient =
                    ctx.createRadialGradient(
                        node.x,
                        node.y,
                        0,
                        node.x,
                        node.y,
                        radius * 7
                    );


                if (
                    node.score >= 0.6
                ) {

                    gradient.addColorStop(
                        0,
                        `rgba(255,218,120,${0.32 * pulse})`
                    );

                    gradient.addColorStop(
                        1,
                        "rgba(255,218,120,0)"
                    );

                } else {

                    gradient.addColorStop(
                        0,
                        `rgba(167,124,255,${0.30 * pulse})`
                    );

                    gradient.addColorStop(
                        1,
                        "rgba(167,124,255,0)"
                    );

                }


                ctx.beginPath();

                ctx.arc(
                    node.x,
                    node.y,
                    radius * 7,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    gradient;

                ctx.fill();


                /*
                 * Star
                 */

                ctx.beginPath();

                ctx.arc(
                    node.x,
                    node.y,
                    radius,
                    0,
                    Math.PI * 2
                );


                if (
                    node.score >= 0.6
                ) {

                    ctx.fillStyle =
                        "#ffe39a";

                } else {

                    ctx.fillStyle =
                        "#a77cff";

                }


                ctx.fill();

            }
        );

    }


    function drawLines(
        positions,
        time
    ) {

        const width =
            wrapper.clientWidth;

        const height =
            wrapper.clientHeight;


        const cx =
            width / 2;

        const cy =
            height / 2;


        /*
         * Lines from centre
         */

        positions.forEach(
            node => {

                ctx.beginPath();

                ctx.moveTo(
                    cx,
                    cy
                );

                ctx.lineTo(
                    node.x,
                    node.y
                );


                ctx.strokeStyle =
                    "rgba(232,185,79,0.075)";

                ctx.lineWidth = 1;

                ctx.stroke();

            }
        );


        /*
         * Outer constellation lines
         */

        for (
            let i = 0;
            i < positions.length;
            i++
        ) {

            const current =
                positions[i];

            const next =
                positions[
                    (i + 1) %
                    positions.length
                ];


            ctx.beginPath();

            ctx.moveTo(
                current.x,
                current.y
            );

            ctx.lineTo(
                next.x,
                next.y
            );


            ctx.strokeStyle =
                "rgba(167,124,255,0.045)";

            ctx.lineWidth = 1;

            ctx.stroke();

        }


        /*
         * Moving light along the
         * constellation.
         */

        const travel =
            (
                time * 0.00005
            ) % 1;


        const index =
            Math.floor(
                travel *
                positions.length
            );


        const nextIndex =
            (
                index + 1
            ) %
            positions.length;


        const progress =
            (
                travel *
                positions.length
            ) %
            1;


        const a =
            positions[index];


        const b =
            positions[nextIndex];


        if (a && b) {

            const x =
                a.x +
                (
                    b.x - a.x
                ) *
                progress;


            const y =
                a.y +
                (
                    b.y - a.y
                ) *
                progress;


            const glow =
                ctx.createRadialGradient(
                    x,
                    y,
                    0,
                    x,
                    y,
                    18
                );


            glow.addColorStop(
                0,
                "rgba(255,227,154,0.9)"
            );


            glow.addColorStop(
                1,
                "rgba(255,227,154,0)"
            );


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                18,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                glow;

            ctx.fill();


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                2.5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "#fff0bd";

            ctx.fill();

        }

    }


    function updateLabels(
        positions
    ) {

        const labelContainer =
            document.getElementById(
                "personaLabels"
            );


        if (!labelContainer) {
            return;
        }


        labelContainer.innerHTML = "";


        positions.forEach(
            node => {

                const label =
                    document.createElement(
                        "div"
                    );


                label.className =
                    "persona-label";


                label.style.left =
                    `${node.x}px`;


                label.style.top =
                    `${node.y}px`;


                label.innerHTML = `

                    <strong>
                        ${escapeHTML(node.name)}
                    </strong>

                    <small>
                        ${node.score.toFixed(3)}
                    </small>

                `;


                labelContainer.appendChild(
                    label
                );

            }
        );

    }


    function draw(
        time = performance.now()
    ) {

        const width =
            wrapper.clientWidth;


        const height =
            wrapper.clientHeight;


        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        /*
         * Soft central glow
         */

        const centerGlow =
            ctx.createRadialGradient(
                width / 2,
                height / 2,
                0,
                width / 2,
                height / 2,
                Math.min(
                    width,
                    height
                ) * 0.48
            );


        centerGlow.addColorStop(
            0,
            "rgba(232,185,79,0.045)"
        );


        centerGlow.addColorStop(
            1,
            "rgba(232,185,79,0)"
        );


        ctx.fillStyle =
            centerGlow;


        ctx.fillRect(
            0,
            0,
            width,
            height
        );


        const positions =
            getPositions();


        drawLines(
            positions,
            time
        );


        drawConstellationStars(
            positions,
            time
        );


        updateLabels(
            positions
        );


        constellationAnimationId =
            requestAnimationFrame(
                draw
            );

    }


    window.addEventListener(
        "resize",
        resize
    );


    resize();

}


/* ============================================================
   INITIAL CUSTOMER
============================================================ */

function initialiseDefaultCustomer() {

    if (
        customerData.length &&
        !currentCustomer
    ) {

        displayCustomer(
            customerData[0]
        );

    }

}


/* ============================================================
   UTILITY
============================================================ */

window.NudgeIQ = {

    showPage,

    searchCustomer,

    displayCustomer,

    loadCustomerData

};