import { Auth0ContextInterface } from "@auth0/auth0-react";
import React, { useEffect, useRef, useState } from "react";

const domain = "dev-1tkiivqacmubkas5.us.auth0.com";
export const AuthPopUp: React.FC<{ authObject: Auth0ContextInterface, show: any, children: any }> =
    ({ authObject, show, children }) => {
        const [showModal, setShowModal] = useState(false);
        const childWindowRef = useRef<Window>();

        const handleShowModal = () => {
            setShowModal(true);
        };

        const handleCloseModal = () => {
            setShowModal(false);
        };
        const showHideClassName = show ? 'modal display-block' : 'modal display-none';
        const openChildWindow = () => {
            const childWindow = window.open('', '_blank', 'height=400,width=400');
            if (childWindow) {
              childWindowRef.current = childWindow;
            }
          };
        
          const closeChildWindow = () => {
            if (childWindowRef.current) {
              childWindowRef.current.close();
            }
          };
        useEffect(() => {
            //const authWindow = window.open('', '_blank', 'width=500,height=600');
            openChildWindow()  //puts window into Ref

            const Prom = new Promise((resolve, reject) => {
                let accessTokenAuth0: string
                const differentAudienceOptions = {
                    authorizationParams: {
                        audience: `https://${domain}/api/v2/`,
                        scope: "read:current_user",
                        redirect_uri: window.location.origin
                    }
                }
                authObject.getAccessTokenWithPopup(differentAudienceOptions,
                    { timeoutInSeconds: 30, popup: childWindowRef.current }
                ).then((accessToken: any) => {
                    accessTokenAuth0 = accessToken as string
                    console.log('auth0 AccessToken', accessToken);
                    //resolve(result);
                    const userDetailsByIdUrl = `https://${domain}/api/v2/users/${authObject.user?.sub}`;
                    return fetch(userDetailsByIdUrl, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    })
                }).then((metadataResponse: any) => {
                    return metadataResponse.json()
                }).then((jsonObject: any) => {
                    const { user_metadata } = jsonObject
                    resolve({ user_metadata: user_metadata, accessTokenAuth0: accessTokenAuth0 })
                }).catch((error: any) => {
                    console.error('The Promise was rejected with:', error);
                    reject(error + '(while getting Auth0 API JWT)');
                });
            })
            if (childWindowRef.current)
            {
                childWindowRef.current.addEventListener('blur', function(event) {
                // Perform actions when the window loses focus
                console.log('childWindowRef.current lost focus');
                // Add your custom logic here
              });
            }
            if (childWindowRef.current) {
                window.addEventListener('beforeunload', closeChildWindow);
            }
            return () => {
                window.removeEventListener('beforeunload', closeChildWindow);
            };
        }, []);
        const handleKeepOnTop = () => {
            if (childWindowRef.current) {
              childWindowRef.current.focus();
            }
          };
        return (<div className={showHideClassName}>
            <section className="modal-main">
                {children}
                <button onClick={handleCloseModal}>Close</button>
            </section>
        </div>
        );

    }

