'use client';
import {Button} from '@components/ui/button';
import {useAuth} from '@hooks/useAuth';
import React from 'react';

const LogoutButton = () => {
	const {logout} = useAuth();
	return <Button onClick={() => logout()}>LOGOUT</Button>;
};

export default LogoutButton;
