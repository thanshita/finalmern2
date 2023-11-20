import React, { useContext } from 'react'
import RestaurantDetails from './RestaurantDetails'
import MenuDetails from './MenuDetails'
import OwnerDetails from './OwnerDetails'
import { Stepper, StepLabel, Step } from '@mui/material'
import './Steps.css'
import { MultiStepContext } from '../Contexts/StepContext'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

const Stepperr = () => {

    const { currentStep, userData } = useContext(MultiStepContext);

    const showStep = (step) => {
        switch (step) {
            case 1:
                return <RestaurantDetails />;
            case 2:
                return <OwnerDetails />
            case 3:
                return <MenuDetails />
            case 4:
                return <MenuDetails />
        }
    }

    return (
        <>
            {currentStep === 1 ? <Navbar /> : <></>}
            <div className="center-stepper">
                <div className='step-middle'>

                    <Stepper style={{ margin: "0 auto" }} activeStep={currentStep - 1} orientation='horizontal'>
                        <Step>
                            <StepLabel>
                                Restaurant Details
                            </StepLabel>
                        </Step>

                        <Step>
                            <StepLabel>
                                Owner Details
                            </StepLabel>
                        </Step>

                        <Step>
                            <StepLabel>
                                Menu Items
                            </StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>
                                Preview
                            </StepLabel>
                        </Step>
                    </Stepper>

                </div>
                {showStep(currentStep)}
            </div>
            <Footer/>
        </>
    )
}

export default Stepperr
