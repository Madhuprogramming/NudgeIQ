/* =========================================================
   NUDGEIQ — BASIC DASHBOARD INTERACTIONS
   ========================================================= */


/* =========================================================
   1. SIDEBAR NAVIGATION
   ========================================================= */

const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {

    item.addEventListener("click", () => {

        // Remove active state
        navItems.forEach((nav) => {
            nav.classList.remove("active");
        });

        // Add active state
        item.classList.add("active");

        console.log(
            "Selected:",
            item.innerText.trim()
        );

    });

});



/* =========================================================
   2. PERSONA CARD HOVER EFFECT
   ========================================================= */

const personaCards =
    document.querySelectorAll(".persona-card");

personaCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-5px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});



/* =========================================================
   3. VIEW ALL PERSONAS BUTTON
   ========================================================= */

const viewButton =
    document.querySelector(".view-button");

if (viewButton) {

    viewButton.addEventListener("click", () => {

        alert(
            "Persona Explorer\n\n" +
            "Premium Investor\n" +
            "Growth Investor\n" +
            "Dormant Wealth Holder\n" +
            "Balanced Investor\n" +
            "General Investor\n" +
            "Potential Investor\n" +
            "Inactive Investor\n" +
            "Emerging Investor\n" +
            "Low Engagement User"
        );

    });

}



/* =========================================================
   4. KPI CARD HOVER
   ========================================================= */

const kpiCards =
    document.querySelectorAll(".kpi-card");

kpiCards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-4px)";

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0)";

    });

});



/* =========================================================
   5. SIMPLE PAGE LOAD MESSAGE
   ========================================================= */

console.log(
    "NudgeIQ Gold Intelligence Dashboard loaded successfully."
);
/* =========================================================
   PERSONA CONSTELLATION
========================================================= */

const personaCanvas =
    document.getElementById("personaCanvas");

const personaCtx =
    personaCanvas.getContext("2d");


const personaNodes = [

    { x:.45, y:.13 },
    { x:.70, y:.23 },
    { x:.80, y:.52 },
    { x:.59, y:.74 },
    { x:.34, y:.76 },
    { x:.15, y:.59 },
    { x:.24, y:.29 },
    { x:.42, y:.46 },
    { x:.67, y:.46 }

];


function resizePersonaCanvas() {

    personaCanvas.width =
        personaCanvas.offsetWidth;

    personaCanvas.height =
        personaCanvas.offsetHeight;

}


resizePersonaCanvas();


window.addEventListener(
    "resize",
    resizePersonaCanvas
);


function drawPersonaConstellation(time) {

    personaCtx.clearRect(
        0,
        0,
        personaCanvas.width,
        personaCanvas.height
    );


    for (
        let i = 0;
        i < personaNodes.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < personaNodes.length;
            j++
        ) {

            const a =
                personaNodes[i];

            const b =
                personaNodes[j];


            const ax =
                a.x *
                personaCanvas.width;

            const ay =
                a.y *
                personaCanvas.height;


            const bx =
                b.x *
                personaCanvas.width;

            const by =
                b.y *
                personaCanvas.height;


            const distance =
                Math.hypot(
                    ax - bx,
                    ay - by
                );


            if (distance < 260) {

                const opacity =
                    .20 *
                    (1 - distance / 260);


                personaCtx.beginPath();

                personaCtx.moveTo(ax, ay);

                personaCtx.lineTo(bx, by);


                personaCtx.strokeStyle =
                    `rgba(232,185,79,${opacity})`;


                personaCtx.lineWidth = .7;

                personaCtx.stroke();

            }

        }

    }


    /* tiny travelling light */

    const travel =
        (time % 5000) / 5000;


    const start =
        personaNodes[0];

    const end =
        personaNodes[7];


    const x =
        (start.x +
        (end.x - start.x) * travel)
        * personaCanvas.width;


    const y =
        (start.y +
        (end.y - start.y) * travel)
        * personaCanvas.height;


    personaCtx.beginPath();

    personaCtx.arc(
        x,
        y,
        2,
        0,
        Math.PI * 2
    );


    personaCtx.fillStyle =
        "#ffe39a";


    personaCtx.shadowBlur = 15;

    personaCtx.shadowColor =
        "#e8b94f";


    personaCtx.fill();


    requestAnimationFrame(
        drawPersonaConstellation
    );

}


requestAnimationFrame(
    drawPersonaConstellation
);


/* =========================================================
   PERSONA CLICK
========================================================= */

document
.querySelectorAll(".persona-star")
.forEach(star => {

    star.addEventListener(
        "click",
        function() {

            const persona =
                this.dataset.persona;


            alert(
                "NudgeIQ Persona\n\n" +
                persona
            );

        }
    );

});
// ======================================================
// SIDEBAR BUTTONS
// ======================================================

// ======================================================
// OPPORTUNITY BUTTON
// ======================================================

const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove the highlight from all buttons
        navButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Highlight the button we clicked
        this.classList.add("active");

        // Check which button was clicked
        const page = this.dataset.page;

        // If Opportunity was clicked
        if (page === "opportunity") {
            showOpportunity();
        }

    });

});


// ======================================================
// OPPORTUNITY SCREEN
// ======================================================
const dashboardContent =
    document.getElementById("dashboardContent");
function showOpportunity() {

    dashboardContent.innerHTML = `

        <div class="top">

            <div>

                <div class="eyebrow">
                    OPPORTUNITY INTELLIGENCE
                </div>

                <div class="title">
                    Gold <span>Opportunity</span>
                </div>

                <p class="description">
                    Identify and prioritize customers
                    with the strongest modeled
                    gold opportunity.
                </p>

            </div>

        </div>


        <div class="opportunity-kpis">


            <div class="opp-kpi glass">

                <div class="opp-icon">✦</div>

                <div class="opp-label">
                    HIGH OPPORTUNITY
                </div>

                <div class="opp-number">
                    2,846
                </div>

                <div class="opp-sub">
                    Priority customers
                </div>

            </div>


            <div class="opp-kpi glass">

                <div class="opp-icon">◇</div>

                <div class="opp-label">
                    MEDIUM OPPORTUNITY
                </div>

                <div class="opp-number">
                    5,731
                </div>

                <div class="opp-sub">
                    Nurture potential
                </div>

            </div>


            <div class="opp-kpi glass">

                <div class="opp-icon">○</div>

                <div class="opp-label">
                    LOW OPPORTUNITY
                </div>

                <div class="opp-number">
                    2,585
                </div>

                <div class="opp-sub">
                    Awareness required
                </div>

            </div>


            <div class="opp-kpi glass">

                <div class="opp-icon">◎</div>

                <div class="opp-label">
                    AVG OPPORTUNITY
                </div>

                <div class="opp-number">
                    0.68
                </div>

                <div class="opp-sub">
                    Modeled score
                </div>

            </div>


        </div>


        <div class="persona-section glass">

            <div class="panel-label">
                PERSONA PRIORITIZATION
            </div>

            <h2>
                Highest Opportunity
                <span>Segments</span>
            </h2>


            <div class="ranking">


                <div class="rank-item">

                    <span class="rank">
                        01
                    </span>

                    <span class="rank-name">
                        Premium Investor
                    </span>

                    <span class="rank-score">
                        0.91
                    </span>

                </div>


                <div class="rank-item">

                    <span class="rank">
                        02
                    </span>

                    <span class="rank-name">
                        Growth Investor
                    </span>

                    <span class="rank-score">
                        0.82
                    </span>

                </div>


                <div class="rank-item">

                    <span class="rank">
                        03
                    </span>

                    <span class="rank-name">
                        Dormant Wealth Holder
                    </span>

                    <span class="rank-score">
                        0.74
                    </span>

                </div>


                <div class="rank-item">

                    <span class="rank">
                        04
                    </span>

                    <span class="rank-name">
                        Balanced Investor
                    </span>

                    <span class="rank-score">
                        0.68
                    </span>

                </div>


            </div>

        </div>

    `;

}