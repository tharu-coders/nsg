window.addEventListener( 'load', () =>
{
    // Animate form elements
    gsap.to( '.form-group', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    } );

    // Animate button
    gsap.to( 'button', {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: 0.8,
        ease: 'power2.out'
    } );
} );

// Form progress tracking
const form = document.getElementById( 'registrationForm' );
const inputs = form.querySelectorAll( 'input:not([type="file"])' );
const progressFill = document.querySelector( '.progress-line-fill' );
const steps = document.querySelectorAll( '.step' );

function updateProgress ()
{
    const totalFields = inputs.length;
    let filledFields = 0;

    inputs.forEach( input =>
    {
        if ( input.value.trim() !== '' ) filledFields++;
    } );

    const progress = ( filledFields / totalFields ) * 100;
    progressFill.style.width = `${ progress }%`;

    // Update steps
    steps.forEach( ( step, index ) =>
    {
        if ( index <= Math.floor( ( filledFields / totalFields ) * 3 ) )
        {
            step.classList.add( 'active' );
        } else
        {
            step.classList.remove( 'active' );
        }
    } );
}

inputs.forEach( input =>
{
    input.addEventListener( 'input', updateProgress );
} );

// File upload preview
const fileInput = document.querySelector( 'input[type="file"]' );
const fileUpload = document.querySelector( '.file-upload' );

fileInput.addEventListener( 'change', function ( e )
{
    if ( this.files && this.files[ 0 ] )
    {
        const reader = new FileReader();
        reader.onload = function ( e )
        {
            fileUpload.style.backgroundImage = `url(${ e.target.result })`;
            fileUpload.style.backgroundSize = 'cover';
            fileUpload.style.backgroundPosition = 'center';
            fileUpload.querySelector( 'p' ).style.display = 'none';
            fileUpload.querySelector( 'i' ).style.display = 'none';
        };
        reader.readAsDataURL( this.files[ 0 ] );
    }
} );